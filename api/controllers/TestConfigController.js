/**
 * TestConfigController
 *
 * @description :: Server-side logic for managing testconfigs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  config:function (req, res) {
    return res.json(ConfigService);
  }

};

