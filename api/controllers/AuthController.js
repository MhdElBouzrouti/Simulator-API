/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var _ = require('lodash');
module.exports = {
  authorization: function (req, res) {
    ////////////////////////////
    /* variables declaration */
    //////////////////////////

    /* Authorization code */

    var authorization = {
      code: req.allParams().code,
      scope: req.allParams().scope,
      state: req.allParams().state
    };

    if (!authorization.code) {
      sails.log.error('[Authorization] : The authorization code not returned by openID provider');
      return res.json(404, {error: 'The authorization code not returned by openID provider'});
    }

    /* token variable */

    var _token_result = {
      access_token: '',
      responseTime: 0,
      statusCode: 0,
      date: '',
      url: '',
      error: {}
    };

    /* API result variable */

    var _resource_result = {
      response: {},
      statusCode: 0,
      responseTime: 0,
      date: '',
      url: ''
    };


    // Logs
    sails.log.info('[Authorization Code] : ' + authorization.code);
    sails.log.info('[Scope] : ' + authorization.scope);
    sails.log.info('[State] : ' + authorization.state);

    // Step 1. Exchange authorization code for access token.

    // Build body of token request
    var dataBody = 'code=' + authorization.code + '&' + 'redirect_uri=' + ConfigService.REDIRECT_URI + '&' + 'client_id=' + ConfigService.CLIENT_ID + '&' + 'client_secret=' + ConfigService.CLIENT_SECRET + '&' + 'grant_type=authorization_code';

    // Token Request
    request({
      method: 'POST',
      url: ConfigService.ACCESS_TOKEN_URL,
      headers: {
        'Authorization': ConfigService.AUTHORIZATION_HEADER
      },
      form: dataBody,
      time: true
    }, tokenRequest);

    function tokenRequest(tokenError, tokenResponse) {
      if (tokenError) {
        sails.log.error(tokenError);
        return res.json(500, {error: tokenError, type: 'token error'});
      }
      // Logs response properties
      sails.log.info('============  Begin TOKEN RESPONSE Request ============');
      sails.log.info(tokenResponse);
      sails.log.info('============  End TOKEN RESPONSE Request ==============');


      // parse the token response
      var token = JSON.parse(tokenResponse.body);
      if (token.error) {
        sails.log.error(token);
        _token_result.error = token;
        return res.json(404, {error: token, type: 'token error'});
      }
      // GET Id_token
      var id_token;
      if (token.id_token) {
        id_token = JSON.parse(new Buffer(token.id_token.split('.')[1], 'base64').toString('ascii'));
      }
      else {
        sails.log.warn('The id_token not founded');
        return res.json(404, {error: 'The id_token not founded, you have to use a openid scope', type: 'token error'});
      }

      if (token.access_token) {
        _token_result.access_token = token.access_token;
      }
      else {
        sails.log.error('[access_token] : not founded');
        return res.json(500, {error: 'access token not founded', type: 'token error'});
      }

      // Step 2. Retrieve resource from API.
      var headers = {Authorization: 'Bearer ' + _token_result.access_token};
      request({
        method: 'GET',
        url: ConfigService.RESOURCE_URL,
        headers: headers,
        time: true
      }, resourceRequest);
      function resourceRequest(resourceError, resourceResponse) {
        if (resourceError) {
          sails.log.error(resourceError);
          return res.json(404, {error: resourceError, type: 'resource API'});
        }
        if (resourceResponse.body.error) {
          sails.log.error(resourceResponse.body.error);
          return res.json(404, {error: resourceResponse.body, type: 'resource API'});
        }
        // Logs Response RESOURCE API
        sails.log.info('============  Begin Resource RESPONSE Request ==============');
        sails.log.info(resourceResponse);
        sails.log.info('============  Begin Resource RESPONSE Request ==============');

        // ----------------- Save data in db (user, token, result)-------
        var sub_id = _.split(id_token, '-', 1)[0];
        User.findOne({sub_id: sub_id}).populate('partners').exec(findUser);
        function findUser(err, user) {
          if (err) return res.json(500, {error: err, type: 'user error'});
          if (!user) {
            // add user
            User.create({
              sub: id_token.sub,
              sub_id: sub_id,
              auth_time: id_token.auth_time,
              iss: id_token.iss,
              auth_code: authorization.code
            }).exec(createUser);
            function createUser(err, newUser) {
              if (err)
                return res.json(500, {error: err, type: 'cration of user'});

              Partner.findOne({client_id: id_token.aud[0]}).exec(findPartner);
              function findPartner(err, partner) {
                if (err) return res.json(500, {error: err, type: 'find partner'});
                if (!partner) return res.json(404, {error: 'Partner no founded'});
                newUser.partners.add(partner);
                newUser.save(addPartner);
                function addPartner(err, editUser) {
                  Token.create({
                    access_token: _token_result.access_token,
                    iat: id_token.iat,
                    exp: id_token.exp,
                    responseTime: tokenResponse.elapsedTime,
                    statusCode: tokenResponse.statusCode,
                    resource: ConfigService.RESOURCE_URL
                  }).exec(createToken);
                  function createToken(err, newToken) {
                    if (err) return res.json(500, {error: err, type: 'creation token'});
                    if (!newToken) return res.json(500, {error: 'Error of creation of token'});
                    editUser.tokens.add(newToken);
                    editUser.save(function (err, updateUser) {
                      if (err) return res.json(500, {error: err, type: 'save new user'});
                      if (!updateUser) return res.json(500, {error: 'User not updated'});
                      Result.create({
                        result: JSON.parse(resourceResponse.body),
                        responseTime: resourceResponse.elapsedTime,
                        url: ConfigService.RESOURCE_URL,
                        statusCode: resourceResponse.statusCode
                      }).exec(createResult);
                      function createResult(error, newResult) {
                        if (error) return res.json(500, {error: error, result: JSON.parse(resourceResponse.body)});
                        if (!newResult) return res.json(500, {
                          error: 'Error Of creation of new Result',
                          result: JSON.parse(resourceResponse.body)
                        });
                        newResult.calledByToken = newToken;
                        newResult.save(function (err, rs) {
                          if (err) return res.json(500, {error: err, result: JSON.parse(resourceResponse.body)});
                          if (!rs) return res.json(500, {
                            error: 'result of api not saved',
                            result: JSON.parse(resourceResponse.body)
                          });
                          return res.json(200, JSON.parse(resourceResponse.body));
                        });
                      }
                    });
                  }
                }
              }
            }
          } else {
            user.auth_time = id_token.auth_time;
            user.auth_code = id_token.auth_code;
            Partner.findOne({client_id: id_token.aud[0]}).exec(findPartner);
            function findPartner(err, partner) {
              if (err) return res.json(500, {error: err, type: 'find partner'});
              if (!partner) return res.json(404, {error: 'partner not founded'});
             // user.partners.add(partner);
              user.save(editUser);
              function editUser(err, editUser) {
                if (err) return res.json(500, {error: err, type: 'edit user'});
                Token.create({
                  access_token: _token_result.access_token,
                  iat: id_token.iat,
                  exp: id_token.exp,
                  resource: ConfigService.RESOURCE_URL,
                  responseTime: tokenResponse.elapsedTime
                }).exec(createToken);
                function createToken(err, newToken) {
                  if (err) return res.json(500, {error: err, type: 'creation of token'});
                  if (!newToken) return res.json(500, {error: 'Error of creation of token'});
                  newToken.byUser = editUser;
                  newToken.save(function () {

                    Result.create({
                      result: JSON.parse(resourceResponse.body),
                      responseTime: resourceResponse.elapsedTime,
                      statusCode: resourceResponse.statusCode,
                      url: ConfigService.RESOURCE_URL
                    }).exec(createResult);
                    function createResult(error, newResult) {
                      if (error) return res.json(500, {error: err, result: JSON.parse(resourceResponse.body)});
                      if (!newResult) return res.json(500, {error: 'Error Of creation of new Result'});
                      newResult.calledByToken = newToken;
                      newResult.save(function (err, rs) {
                        return res.json(200, JSON.parse(resourceResponse.body));
                      });
                    }
                  });

                }

              }
            }

          }
        }
      }
    }
  },
  index: function (req, res) {
    return res.json({title: 'Partner simulator', description: '', version: '0.2'});
  }

};

