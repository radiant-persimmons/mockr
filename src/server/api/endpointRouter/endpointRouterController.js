var VError = require('verror');
var url = require('url');
var User = require('../user/userModel.js');
var Endpoint = require('../endpoint/endpointModel.js');
var utils = require('../../utils');
var reportError = require('../../utils/errorReporter');
var methodController = require('./methodController');

module.exports = {
  handler: handler,
  changeDataHandler: changeDataHandler
};

///////////

/**
 * Initial handler for all requests to persistent endpoints
 * Supported methods: GET, POST, PUT, DELETE
 * @param  {Object}   req  Request
 * @param  {Object}   res  Response
 * @param  {Function} next Next middleware
 * @return {undefined}
 */
function handler(req, res, next) {
  var actions = {
    GET: methodController.getData,
    POST: methodController.postData,
    // Handle PUT and DELETE initially together in a special function
    PUT: changeDataHandler,
    DELETE: changeDataHandler
  };

  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;
  var data;

  // Check that method is supported
  if (typeof actions[method] !== 'function') {
    return reportError(new Error(method + 'method not supported'),
                       next, 'Unsupported method for endpoints', 500);
  }

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return reportError(new VError('db error finding /%s/%s', username, route),
                                next);

    if (!endpoint) return reportError(new VError('no endpoint exists for /%s/%s', username, route),
                                      next, 'Invalid endpoint', 400);

    utils.incrementCallCount(username, route, endpoint, method, function(err) {
      if (err) return reportError(err, next, 'Failed to get endpoint data', 500);

      if(endpoint.persistence === true) {
        actions[method](req, res, next, username, route, method, endpoint);

      //else, if persistance is set to false
      } else {
        //TODO check if we have nested object with that method
        if (!endpoint.methods[method]) {
          return reportError(new VError('no response set for method %s', method),
                             next, 'No response has been set for that method', 400);
        }
        // TODO add headers in the response

        //get statusCode and data from user input
        var statusCode = endpoint.methods[method].status;
        data = endpoint.methods[method].data;
        return res.status(statusCode).json(data);
      }
    });
  });
}

function changeDataHandler(req, res, next, username, route, method, endpoint) {

  var actions = {
    PUT: methodController.updateData,
    DELETE: methodController.deleteData
  };

  // we need a parameter passed to know what to change
  if (!req.query.id) return reportError(new VError('no query id specified'),
                                        next, 'please specify query id', 400);

  var queryID = parseInt(req.query.id);
  var dataPoint = utils.lookForDataPoint(endpoint.data, queryID);
  if (!dataPoint) return reportError(new VError('no item with ID %s', queryID),
                                     next, 'invalid ID', 400);

  actions[method](req, res, next, username, route, queryID, dataPoint);
}
