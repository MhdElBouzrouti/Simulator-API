/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {post} /auth/login Authentication of User
   * @apiParam {string} username a username
   * @apiParam {string} password a password
   * @apiVersion 0.2.0
   * @apiGroup Login
   */
  login:function (req, res) {
    var username= req.allParams().username,
      password=req.allParams().password;

    if(!username || !password) return res.badRequest({message:'Bad request'});
    Login.findOne({username:username}).exec(function (err, login) {
      if(err) return res.serverError({message:err});
      if(!login) return res.notFound({message:'Login not founded'});
      if(login.username===username && login.password===password){
        var token=JWTService.encode(login.username);
        return res.json({token:token});

      }else{
        return res.forbidden({message:'login or password not match'});
      }
    });
  }

};

