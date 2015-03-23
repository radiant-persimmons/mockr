var verror = require('verror');
var reportError = require('../../utils/errorReporter');
var Endpoint = require('./endpointModel');
var User = require('../user/userModel');

module.exports = {
  getEndpoints: getEndpoints,
  createEndpoint: createEndpoint,
  getEndpoint: getEndpoint,
  editEndpoint: editEndpoint,
  deleteEndpoint: deleteEndpoint
};

///////////////

function getEndpoints(req, res, next) {
  var username = req.params.username;
    Endpoint.find({'username': username}, function (err, endpoints) {
      if (err) return reportError(err, next, 'Could not get endpoints for ' + username, 500);
      res.json(endpoints);
    });
}

function createEndpoint(req, res, next) {
  var username = req.params.username;
  var route = req.body.route;
  var methods = req.body.methods;
  var persistence = req.body.persistence;
  var businessLogic = req.body.businessLogic;

  var analytics = {};
  analytics.GET = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0};
  analytics.POST = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0};
  analytics.PUT = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0};
  analytics.DELETE = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0};

  var stdErrMessage = 'Could not create endpoint';

  User.findOne({'username': username}, function (err, user) {
    if (err) {
      err = new verror(err, 'database error finding user %s', username);
      return reportError(err, next, stdErrMessage, 500);
    }

    //check if user exists here before creating the endpoint
    if (!user) {
      err = new verror('user "%s" does not exist', username);
      return reportError(err, next, stdErrMessage, 400);
    }

    var newEndpoint = new Endpoint({ username: username, route: route, methods: methods, persistence: persistence, businessLogic: businessLogic, analytics: analytics });

    Endpoint.findOne({ username: username, route: route }, function(err, endpoint) {
      if (err) {
        err = new verror(err, 'database error finding endpoint for username "%s", route "%s"', username, route);
        return reportError(err, next, stdErrMessage, 500);
      }

      // abort if endpoint exists
      if (endpoint) {
        err = new verror('endpoint for /%s/%s already exists', username, route);
        return reportError(err, next, stdErrMessage, 400);
      }

      newEndpoint.save(function(err, endpoint) {
        if (err) {
          err = new verror(err, 'database error saving new endpoint');
          return reportError(err, next, stdErrMessage, 500);
        }

        User.update({username: username}, {$push: {'endpoints': endpoint._id}}, function(err) {
          if (err) {
            err = new verror(err, 'database error updating user with new endpoint');
            return reportError(err, next, stdErrMessage, 500);
          }
          res.status(201).end();
        });
      });
    });
  });
}


function getEndpoint(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return reportError(err, next, 'db error finding endpoint', 500);
    // TODO: handle endpoint not found?
    res.json(endpoint);
  });

}

function editEndpoint(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var newRoute = req.body.route;
  var methods = req.body.methods;
  var persistence = req.body.persistence;
  var businessLogic = req.body.businessLogic;

  var newData = {};
  newData.methods = methods;
  newData.username = username;
  newData.route = newRoute;
  newData.persistence = persistence;
  newData.businessLogic = businessLogic;

  //TODO check if username exists before creating endpoint
  Endpoint.findOneAndUpdate({ 'username': username, 'route': route }, newData, {upsert: true},function(err, numberAffected, raw) {
    if (err) return reportError(err, next, 'db error finding and updating endpoint', 500);
    res.status(201).end();
  });
}

function deleteEndpoint(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];

  Endpoint.remove({ 'username': username, 'route': route }, function(err) {
    if (err) return reportError(err, next, 'db error deleting endpoint', 500);
    res.status(201).end();
  });
}


