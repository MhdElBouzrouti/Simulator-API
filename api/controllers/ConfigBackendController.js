/**
 * ConfigBackendController
 *
 * @description :: Server-side logic for managing configbackends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
module.exports = {
  /**
   * @api {post} /config A configure of the backend
   * @apiHeader {string} Authorization token.
   * @apiVersion 0.2.0
   * @apiGroup Configuration
   * @apiParam {integer} clientID A ID of the client (Service Provider)
   * @apiParam {integer} resourceID A ID of resource API
   * @apiParam {integer} oidcID A ID of OpenID Provider
   * @apiParam {integer} state A state of authorization
   * @apiParamExample {json} Request-Example
   *  POST /config
   *    {
   *      "clientID":'13ef43',
   *      "resourceID":'efgh',
   *      "oidcID":'456fae6',
   *      "state":'bc2e34de4'
   *    }
   * @apiError LockOfInformationError the lack of information to complete the operation.
   * @apiError DataAccessError Errors access to the data.
   */
  config: function (req, res) {
    sails.log.info('====== Begin Configuration Request =======');
    var partnerId = req.allParams().partnerId;
    var resourceId = req.allParams().resourceId;
    var oidcId = req.allParams().oidcId;

    if (!partnerId || !resourceId || !oidcId) {
      return res.json(403, {type: 'LockOfInformationError', message: 'the lack of PartnerId, ResourceID Or ResourceID '});
    }
    Partner.findOne({id:partnerId}).exec(function (err, partner) {

      if(err) return  res.json(500,{type:'DataAccessError',message:err});
      if(!partner) return res.json(400,{type:'DataAccessError',message:'Partner not founded'});

      ConfigService.CLIENT_ID=partner.client_id;
      ConfigService.CLIENT_SECRET=partner.client_secret;
      ConfigService.REDIRECT_URI=partner.redirect_uri;
      ConfigService.AUTHORIZATION_HEADER='Basic '+(new Buffer(partner.client_id+':'+partner.client_secret).toString('base64'));
      // LOGS For Partner
      sails.log.info('====================== PARTNER INFORMATION ======================');
      sails.log.info('[CLIENT ID] :'+ ConfigService.CLIENT_ID);
      sails.log.info('[CLIENT SECRET] :'+ ConfigService.CLIENT_SECRET);
      sails.log.info('[CLIENT REDIRECT URI] :'+ ConfigService.REDIRECT_URI);
      sails.log.info('[CLIENT AUTHORIZATION HEADER] :'+ ConfigService.AUTHORIZATION_HEADER);
      sails.log.info('====================== END PARTNER INFORMATION ====================');

      // GET API RESOURCE URL from db
      Resource.findOne({id:resourceId}).exec(function (err, resource) {

        if(err) return res.json(500,{type:'DataAccessError',message:err});

        if(!resource) return res.json(400,{type:'DataAccessError',message:'Partner not founded'});

        ConfigService.RESOURCE_URL=resource.base+'/'+resource.offer+'/'+resource.country+'/'+resource.version+'/'+resource.path;
        sails.log.info('[API RESOURCE] : ' + ConfigService.RESOURCE_URL);

        // GET oidc
        Oidc.findOne({id:oidcId}).exec(function (err, oidc) {
          if(err) return res.json(500,{message:err,type:'DataAccessError'});
          if(!oidc) return res.json(404,{type:'DataAccessError',message:'Partner not founded'});
          ConfigService.ACCESS_TOKEN_URL=oidc.token_uri;
          sails.log.info('====== End Configuration Request =======');
          return res.json('Ok');
        });

      });
    });


  }
};

