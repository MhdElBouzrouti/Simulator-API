/**
 * Created by Mohammed on 23/05/2016.
 */

module.exports=function(req, res, next) {
  if(!req.headers.authorization){
    return res.forbidden({message:'No authorization header founded'});
  }
  var jwt=req.headers.authorization.split(' ')[1].toString();
  sails.log.info('[JWT]:');
  sails.log.info(jwt);

  var login = JWTService.decode(jwt);

  if(!login.sub){
    return res.forbidden({message:'authorization Header not valid'});
  }
  req.sub=login.sub;
  return next();
};
