/**
 * Token.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    access_token:{
      type:'string'
    },
    iat:{
      type:'string'
    },
    exp:{
      type:'string'
    },
    responseTime:{
      type:'integer'
    },
    statusCode:{
      type:'integer'
    },
    scope:{
      type:'string'
    },
    resource:{
      type:'string'
    },
    byUser:{
      model:'user'
    },
    api_results:{
      collection:'result',
      via:'calledByToken'
    }
  }
};

