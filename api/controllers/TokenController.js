/**
 * TokenController
 *
 * @description :: Server-side logic for managing tokens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {get} /token/:id Get a Token
   * @apiHeader {string} Authorization token.
   * @apiParam {string} id ID of the token.
   * @apiSuccess {string} access_token
   * @apiSuccess {number} exp
   * @apiSuccess {number} iat
   * @apiSuccess {string} resource
   * @apiSuccess {number} responseTime
   * @apiSuccess {number} statusCode
   * @apiSuccessExample {json} Request-Example
   * GET /token/577a28xxxxxxxx89
   * {
   *    "access_token": "OFR-56dcb65b4xxxxxxxxxxx53491e6710f64204920d",
   *    "createdAt": "2016-07-04T09:13:39.006Z",
   *    "exp": "1467627218",
   *    "iat": "1467623618",
   *    "resource": "https://api.orange.com/formfilling/fr/v1/userinfo",
   *    "responseTime": 746,
   *    "statusCode": 200,
   *    "updatedAt": "2016-07-04T09:13:39.037Z",
   *    "id": "577a28xxxxxxxx89"
   * }
   * @apiVersion 0.2.0
   * @apiGroup Token
   */

  /**
   * @api {DELETE} /token/:id Delete a Token
   * @apiHeader {string} Authorization token.
   * @apiParam {string} id ID of the token.
   * @apiVersion 0.2.0
   * @apiGroup Token
   */


};

