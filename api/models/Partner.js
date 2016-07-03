/**
 * Partner.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    client_id: {
      type: 'string'
    },
    client_secret: {
      type: 'string'
    },
    redirect_uri: {
      type: 'string'
    },
    description:{
      type:'string'
    },
    consents:{
      collection:'user',
      via:'partners',
      dominant:true
    }
  }
};

