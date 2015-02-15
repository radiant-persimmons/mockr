var Endpoint = require('./endpointModel');
var User = require('../user/userModel');

var getEndpoints = function(req, res, next) {
  var username = req.params.user;
    User.findOne({'username': user}, function (err, user) {
      if (err) return res.end(err);
      //return user
      console.log('endpoints -->', user.endpoints);
      res.json(user.endpoints);
    });
};

var createEndpoint = function(req, res, next) {
  var user = req.params.user;
  var path = req.body.path;
  var verb = req.body.verb;
  var data = req.body.data;

  User.findOne({'username': user}, function (err, user) {
    if (err) return res.end(err);
    
  });
};

var getEndpoint = function(req, res, next) {

};

var editEndpoint = function(req, res, next) {
  
};

module.exports = {
  getEndpoints: getEndpoints,
  createEndpoint: createEndpoint,
  getEndpoint: getEndpoint,
  editEndpoint: editEndpoint
};

