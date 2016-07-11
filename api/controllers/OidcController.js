/**
 * OidcController
 *
 * @description :: Server-side logic for managing oidcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {get} /oidc/:id Get a OIDC Configuration
   * @apiParam id
   * @apiVersion 0.2.0
   * @apiSuccess  auth_uri
   * @apiSuccess  description
   * @apiSuccess  token_uri
   *
   * @apiGroup OIDC
   */

  /**
   * @api {DELETE} /oidc/:id Delete a OIDC Configuration
   * @apiVersion 0.2.0
   * @apiGroup OIDC
   */
  /**
   * @api {POST} /oidc Create a OIDC Configuration
   * @apiVersion 0.2.0
   * @apiParam auth_uri
   * @apiParam description
   * @apiParam token_uri
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
   * @apiVersion 0.2.0
   * @apiParam id a ID of the OIDC
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

