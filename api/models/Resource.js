/**
 * Resource.js
 *
 * @description :: This description for URL API
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    description:{
      type:'string'
    },
    offer:{
      type:'string'
    },
    country:{
      type:'string'
    },
    version:{
      type:'string'
    },
    path:{
      type:'string'
    },
    base:{
      type:'string'
    },
    scope:{
      type:'string'
    },
    results:{
      collection:'result',
      via:'resource'
    }
  }
};

