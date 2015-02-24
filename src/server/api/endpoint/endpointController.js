var Endpoint = require('./endpointModel');
var User = require('../user/userModel');

var getEndpoints = function(req, res, next) {
  var username = req.params.username;
    Endpoint.find({'username': username}, function (err, endpoints) {
      if (err) return res.end(err);
      console.log('endpoints -->', endpoints);
      res.json(endpoints);
    });
};

var createEndpoint = function(req, res, next) {
  var username = req.params.username;
  var route = req.body.route;
  var methods = req.body.methods;
  var persistence = req.body.persistence;

  //{pK: "id", name: true, content: true }

  User.findOne({'username': username}, function (err, user) {
    if (err) return res.status(500).json({ message: err });
    //check if user exists here before creating the endpoint
    if(!user) {
      res.status(500).end();
    } else {
      var newEndpoint = new Endpoint({ username: username, route: route, methods: methods, persistence: persistence });

      Endpoint.findOne({ username: username, route: route }, function(err, endpoint) {
        if(err) return res.status(500).json({ message: err });
        if(endpoint) {
          return res.status(500).end();
        } else {
          newEndpoint.save(function(err, endpoint) {
            if (err) return res.status(500).json({ message: err });

            User.update({username: username}, {$push: {'endpoints': endpoint._id}}, function(err, numAffected, rawResponse) {
              if (err) return res.status(500).json({ message: err });
              res.status(201).end();
            });
          });
        }
      });
    }
  });
};


var getEndpoint = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];

  console.log('params', req.params);
  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).json({ message: err });
    console.log('endpoints -->', endpoint);
    res.json(endpoint);
  });

};

var editEndpoint = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var newRoute = req.body.route;
  var methods = req.body.methods;
  var persistence = req.body.persistence

  var newData = {};
  newData.methods = methods;
  newData.username = username;
  newData.route = newRoute;
  newData.persistence = persistence;

  //TODO check if username exists before creating endpoint
  Endpoint.findOneAndUpdate({ 'username': username, 'route': route }, newData, {upsert: true},function(err, numberAffected, raw) {
    if (err) {
      return res.status(500).end();
    }
    res.status(201).end();
  });
};

var deleteEndpoint = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];

  Endpoint.remove({ 'username': username, 'route': route }, function(err) {
    if (err) {
      return res.status(500).end();
    }
    res.status(201).end();
  });
};

module.exports = {
  getEndpoints: getEndpoints,
  createEndpoint: createEndpoint,
  getEndpoint: getEndpoint,
  editEndpoint: editEndpoint,
  deleteEndpoint: deleteEndpoint
};

