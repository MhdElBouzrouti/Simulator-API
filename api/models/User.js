/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    iss:{
      type:'string'
    },
    sub:{
      type:'string'
    },
    sub_id:{
      type:'string'
    },
    auth_time:{
      type:'string'
    },
    auth_code:{
      type:'string'
    },
    partners:{
      collection:'partner',
      via:'consents'
    },
    tokens:{
      collection:'token',
      via:'byUser'
    },
    identifiedBy:{
      collection:'oidc'
    },
    msisdn:{
      model:'msisdn'
    }
  }
};

