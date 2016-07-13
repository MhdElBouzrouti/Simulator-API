/**
 * PartnerController
 *
 * @description :: Server-side logic for managing partners
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {get} /partner/:id Get a Partner
   * @apiHeader {string} Authorization token.
   * @apiParam  {string} id
   * @apiSuccess  {string} client_id
   * @apiSuccess  {string} client_secret
   * @apiSuccess  {string} description
   * @apiSuccess  {string} redirect_uri
   * @apiSuccessExample {json} Request-Example
   * GET /partner/57794axxxxxxxxxxxx6251
   *  {
   *    "client_id": "TmAxxxxxxxxxxxxxxxxxBd",
   *    "client_secret": "gxxxxxxxxxxxxxxxxx",
   *    "createdAt": "2016-07-03T17:27:18.625Z",
   *    "description": "xxxx xx - Login/Password",
   *    "redirect_uri": "http://checkandgo-orangegroup.rhcloud.com/auth/callback",
   *    "updatedAt": "2016-07-07T09:03:05.957Z",
   *    "id": "57794axxxxxxxxxxxx6251"
   *  }
   * @apiVersion 0.2.0
   * @apiGroup Partner
   */

  /**
   * @api {DELETE} /partner/:id Delete a Partner
   * @apiHeader {string} Authorization token.
   * @apiParam  {string} id
   * @apiVersion 0.2.0
   * @apiGroup Partner
   */
  /**
   * @api {POST} /partner Create a Partner
   * @apiHeader {string} Authorization token.
   * @apiParam  {string} id
   * @apiParam  {string} client_id
   * @apiParam  {string} client_secret
   * @apiParam  {string} description
   * @apiParam  {string} redirect_uri
   * @apiParamExample {json} Request-Example
   * POST /partner
   *  {
   *    "client_id": "TmAxxxxxxxxxxxxxxxxxBd",
   *    "client_secret": "gxxxxxxxxxxxxxxxxx",
   *    "description": "xxxx xx - Login/Password",
   *    "redirect_uri": "http://checkandgo-orangegroup.rhcloud.com/auth/callback",
   *    "id": "57794axxxxxxxxxxxx6251"
   *  }
   * @apiVersion 0.2.0
   * @apiGroup Partner
   */
  /**
   * @api {PUT} /partner/:id Edit a Partner
   * @apiHeader {string} Authorization token.
   * @apiParam  {string} id* @apiParamExample {json} Request-Example
   * PUT /partner
   *  {
   *    "client_id": "TmAxxxxxxxxxxxxxxxxxBd",
   *    "client_secret": "gxxxxxxxxxxxxxxxxx",
   *    "id": "57794axxxxxxxxxxxx6251"
   *   }
   * @apiVersion 0.2.0
   * @apiGroup Partner
   */

};

