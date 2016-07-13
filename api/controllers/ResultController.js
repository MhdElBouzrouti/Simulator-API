/**
 * ResultController
 *
 * @description :: Server-side logic for managing results
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {get} /result/:id Get a Result
   * @apiHeader {string} Authorization token.
   * @apiParam id Id of Result
   * @apiSuccess {number} statusCode
   * @apiSuccess {string} url
   * @apiSuccess {number} responseTime response Time in MS
   * @apiSuccess {string} id Id of Result
   * @apiSuccess {number} updatedAt
   * @apiSuccess {json} result Get a result of the API
   * @apiSuccessExample {json} Request-Example
   *  {
   *   "createdAt": "2016-07-04T09:13:39.022Z",
   *   "responseTime": 1156,
   *   "result": {
   *           "locale": "fr-FR",
   *           "birthdate": "19xx-0x-x0",
   *           "name": "xxxxxxxx xxx",
   *           "given_name": "xxxxxxxxxx",
   *           "family_name": "xxx',
   *           "gender": "male",
   *           "updated_at": 1465287033,
   *           "email": "xxxxxxxx.xxx@xxx.com",
   *           "phone_number": "+33(0)xxxxxxxxx9",
   *           "sub": "HZLOHU-200-yOxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx="
   *           },
   *   "statusCode": 200,
   *   "updatedAt": "2016-07-04T09:13:39.052Z",
   *   "url": "https://api.orange.com/formfilling/fr/v1/userinfo",
   *   "id": "577axxxxxxxxx3268a"
   * }
   *
   *
   * @apiVersion 0.2.0
   * @apiGroup Result
   */

  /**
   * @api {DELETE} /result/:id Delete a Result
   * @apiHeader {string} Authorization token.
   * @apiParam id Id of Result
   * @apiVersion 0.2.0
   * @apiGroup Result
   */
};
