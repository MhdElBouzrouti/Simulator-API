/**
 * ResourceController
 *
 * @description :: Server-side logic for managing resources
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {get} /resource Get a resource
   * @apiHeader {string} Authorization token.
   * @apiSuccess {string} country
   * @apiSuccess {string} description
   * @apiSuccess {string} offer
   * @apiSuccess {string} path
   * @apiSuccess {string} scope
   * @apiSuccess {string} version
   * @apiParam {string} id
   * @apiSuccessExample {json} Request-Example
   * GET /resource/577xxxxxxxxxx6a1
   *
   * {
   *    "base": "https://api.orange.com",
   *    "country": "fr",
   *    "createdAt": "2016-07-04T10:37:05.796Z",
   *    "description": "Orange France - Location check - Production",
   *    "offer": "locationcheck",
   *    "path": "premiuminfo",
   *    "scope": "location_check",
   *    "updatedAt": "2016-07-04T10:39:39.635Z",
   *    "version": "v1",
   *    "id": "577xxxxxxxxxx6a1"
   * }
   * @apiVersion 0.2.0
   * @apiGroup Resource
   */

  /**
   * @api {DELETE} /resource/:id Delete a Resource
   * @apiHeader {string} Authorization token.
   * @apiParam {string} id
   * @apiVersion 0.2.0
   * @apiGroup Resource
   */
  /**
   * @api {POST} /resource Create a Resource
   * @apiHeader {string} Authorization token.
   * @apiParam {string} country
   * @apiParam {string} description
   * @apiParam {string} offer
   * @apiParam {string} path
   * @apiParam {string} scope
   * @apiParam {string} version
   * @apiParamExample {json} Request-Example
   * POST /resource
   * {
   *    "base": "https://api.orange.com",
   *    "country": "fr",
   *    "description": "Orange France - Location check - Production",
   *    "offer": "locationcheck",
   *    "path": "premiuminfo",
   *    "scope": "location_check",
   *    "version": "v1",
   *    "id": "577xxxxxxxxxx6a1"
   * }
   * @apiVersion 0.2.0
   * @apiGroup Resource
   */
  /**
   * @api {PUT} /resource Edit a Resource
   * @apiHeader {string} Authorization token.
   * @apiParam {string} id
   * @apiParam {string} country
   * @apiParam {string} description
   * @apiParamExample {json} Request-Example
   * PUT /resource
   * {
   *    "base": "https://api.orange.com",
   *    "country": "fr",
   *    "description": "Orange France - Location check - Production",
   *    "id": "577xxxxxxxxxx6a1"
   * }
   * @apiVersion 0.2.0
   * @apiGroup Resource
   */

};

