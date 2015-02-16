var Endpoint = require('./endpointModel');
var User = require('../user/userModel');

var getEndpoints = function(req, res, next) {
  var username = req.params.username;
    User.findOne({'username': username}, function (err, user) {
      if (err) return res.end(err);
      console.log('endpoints -->', user.endpoints);
      res.json(user.endpoints);
    });
};

var createEndpoint = function(req, res, next) {
  var username = req.params.username;
  var path = req.body.path;
  var verb = req.body.verb;
  var data = req.body.data;
  var obj = {verb: verb, data: data};
  var container = {};
  container[path] = obj;

  User.findOne({'username': username}, function (err, user) {
    if (err) return res.end(err);
    if(!user) {
      res.status(500).end();
    } else {
      User.update({username: username}, { 
      	$set: { endpoints: container } 
      }, function(err, numAffected, rawResponse) {
        if (err) return res.status(500).json({ message: err });
          console.log(rawResponse);
          res.status(201).json(rawResponse);
      });
    }
  });
};

var getEndpoint = function(req, res, next) {
  var username = req.params.username;
  var path = req.params[0];

  console.log('params', req.params);
  User.findOne({'username': username}, function (err, user) {
    if (err) return res.status(500).end(err);
    var endpoint = user.endpoints[path];
    console.log('endpoint', endpoint);
    res.json(endpoint);
  });

};

var editEndpoint = function(req, res, next) {
  
};

module.exports = {
  getEndpoints: getEndpoints,
  createEndpoint: createEndpoint,
  getEndpoint: getEndpoint,
  editEndpoint: editEndpoint
};

