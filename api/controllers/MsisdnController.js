/**
 * MsisdnController
 *
 * @description :: Server-side logic for managing msisdns
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {get} /msisdn/:id Get a MSISDN
   * @apiParam {Number} id ID of MSISDN.
   * @apiSuccess {string} country
   * @apiSuccess {string} createdAt
   * @apiSuccess {string} description
   * @apiSuccess {string} msisdn
   * @apiSuccess {string} updatedAt
   * @apiSuccess {string} id
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *       "country": "France",
   *       "createdAt": "2016-07-07T13:34:52.712Z",
   *       "description": "User 1 - France - 33642199697",
   *       "msisdn": "33642199697",
   *       "updatedAt": "2016-07-07T13:38:49.449Z",
   *       "id": "577e5a7c15e95041712f515a"
   *     }
   * @apiGroup MSISDN
   * @apiVersion 0.2.0
   */

  /**
   * @api {DELETE} /msisdn/:id Delete a MSISDN
   * @apiParam {Number} ID of a MSISDN
   * @apiVersion 0.2.0
   * @apiGroup MSISDN
   */

  /**
   * @api {POST} /msisdn Create a MSISDN
   * @apiParam {string} description
   * @apiParam {string} msisdn
   * @apiParam {string} country
   * @apiParamExample {json} Request-Example:
   * POST /msisdn
   *    {
   *       "description": "User x - France - 3364xxxxxxx",
   *       "msisdn": "3364xxxxxxx",
   *       "country": "France"
   *     }
   *
   * @apiVersion 0.2.0
   * @apiGroup MSISDN
   */

  /**
   * @api {PUT} /msisdn/:id Edit a MSISDN
   * @apiParam {string} id ID of MSISDN
   * @apiParam {string} msisdn a phone number
   * @apiParam {string} description description of MSISDN
   * @apiParamExample {json} Request-Example
   * PUT /msisdn/1a5e66cxxxxx
   *  {
   *    "msisdn":"336444xxxxx",
   *    "description:"User x - France - 336444xxxxx"
   *  }
   * @apiVersion 0.2.0
   * @apiGroup MSISDN
   */

};

