/**
 * OidcController
 *
 * @description :: Server-side logic for managing oidcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {get} /oidc/:id Get a OIDC Configuration
   * @apiHeader {string} Authorization access token.
   * @apiParam id ID of Oidc
   * @apiVersion 0.2.0
   * @apiSuccess  {string} auth_uri
   * @apiSuccess  {string} description
   * @apiSuccess  {string} token_uri
   *@apiSuccessExample {json} Request-Example
   * GET /oidc/57794aac1305f74f17036250
   *  {
   *    "auth_uri": "https://api.orange.com/openidconnect/fr/v1/authorize",
   *    "createdAt": "2016-07-03T17:26:04.837Z",
   *    "description": "Orange France - OpenID Connect",
   *    "token_uri": "https://api.orange.com/openidconnect/fr/v1/token",
   *    "updatedAt": "2016-07-07T09:19:17.479Z",
   *    "id": "57794aac1305f74f17036250"
   *  }
   * @apiGroup OIDC
   */

  /**
   * @api {DELETE} /oidc/:id Delete a OIDC Configuration
   * @apiHeader {string} Authorization access token.
   * @apiParam id ID of Oidc
   * @apiVersion 0.2.0
   * @apiGroup OIDC
   */
  /**
   * @api {POST} /oidc Create a OIDC Configuration
   * @apiHeader {string} Authorization access token.
   * @apiVersion 0.2.0
   * @apiParam {string} auth_uri
   * @apiParam {string} description
   * @apiParam {string} token_uri
   * @apiParamExample {json} Request-Example
   *    POST /oidc
   *    {
   *      "auth_uri": "https://api.orange.com/openidconnect/fr/v1/authorize",
   *      "description": "Orange France - OpenID Connect",
   *      "token_uri": "https://api.orange.com/openidconnect/fr/v1/token"
   *    }
   * @apiGroup OIDC
   */

  /**
   * @api {PUT} /msisdn/:id Edit a OIDC Configuration
   * @apiHeader {string} Authorization access token.
   * @apiVersion 0.2.0
   * @apiParam id a ID of the OIDC
   * @apiParam {string} auth_uri
   * @apiParam {string} description
   * @apiParam {string} token_uri
   * @apiParamExample {json} Request-Example
   *    PUT /oidc/2efxxxxx
   *    {
   *      "description": "Orange France - OpenID Connect",
   *      "token_uri": "https://api.orange.com/openidconnect/fr/v1/token",
   *      "auth_uri": "https://api.orange.com/openidconnect/fr/v1/authorize"
   *    }
   * @apiGroup OIDC
   */

};

