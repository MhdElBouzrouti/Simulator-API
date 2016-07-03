/**
 * CallResourceApiController
 *
 * @description :: Server-side logic for managing callresourceapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request=require('request');
module.exports = {
  apiCall: function (req, res) {

    var accessToken = req.allParams().accessToken;
    var times = req.allParams().times;
    var url = req.allParams().url;
    if(!accessToken || !times || !url)
      return res.json(400,{message:'Not found'});

    // declaration of variables

    var results=[];
    function sendRequest(callback){
      var headers = {Authorization: 'Bearer ' + accessToken};
      request({
        method: 'GET',
        url: url,
        headers: headers,
        time: true
      }, resourceRequest);
      function resourceRequest(resourceError, resourceResponse) {
        sails.log.info('Call apps');
        if(resourceError){
          results.push({result:JSON.parse(resourceError.body),responseTime:resourceError.elapsedTime,status:resourceError.statusCode});
          callback();
        }
        if(resourceResponse) {
          results.push({result: JSON.parse(resourceResponse.body),responseTime:resourceResponse.elapsedTime,status:resourceResponse.statusCode});
          callback();
        }
      }
    }
    function iterations(n, next) {
      sendRequest(function () {
        next();
      });

    }
    async.timesSeries(times,iterations,function(){
      return res.json(results);
    })


  }
};

