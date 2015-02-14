var Endpoint = require('./endpointModel');
var User = require('../user/userModel');

var createEndpoint = function(req, res, next) {
  var user = req.params.user;
  var path = req.body.path;
  var verb = req.body.verb;
  var data = req.body.data;
};