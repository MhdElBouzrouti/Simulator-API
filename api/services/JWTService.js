var jwt = require('jwt-simple');
var moment = require('moment');
module.exports = {
 encode:function (username) {
   var payload = {
     sub: username,
     iat: moment().unix(),
     exp: moment().add(7, 'days').unix()
   };
   return jwt.encode(payload, ConfigService.TOKEN_SECRET);

 },
  decode:function (token) {
    var payload = jwt.decode(token, ConfigService.TOKEN_SECRET);
    return payload;
  }
};
