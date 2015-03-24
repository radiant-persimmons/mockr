/**
 * Handles the necessary lookups, error-checking, etc., required for all
 * endpoint requests before performing the actual work entailed by the method.
 * @module
 */

var VError = require('verror');
var url = require('url');
var Endpoint = require('../endpoint/endpointModel.js');
var utils = require('../../utils');
var reportError = require('../../utils/errorReporter');
var methodController = require('./methodController');

module.exports = {
  handler: handler,

  // helper functions exposed for unit testing
  _changeDataHandler: _changeDataHandler
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
    PUT: _changeDataHandler,
    DELETE: _changeDataHandler
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
    if (err) return reportError(new VError(err, 'db error finding /%s/%s', username, route),
                                next);

    if (!endpoint) return reportError(new VError('no endpoint exists for /%s/%s', username, route),
                                      next, 'Invalid endpoint', 400);

    utils.incrementCallCount(username, route, endpoint, method, function(err) {
      if (err) return reportError(err, next, 'Failed to get endpoint data', 500);

      if(endpoint.persistence === true) {
        actions[method](req, res, next, username, route, endpoint);

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

/**
 * Special handler for additional lookups on methods that involve changing
 * data in place, e.g. PUT and DELETE.
 * @param  {Object}   req      Request
 * @param  {Object}   res      Response
 * @param  {Function} next     Next
 * @param  {string}   username Username
 * @param  {string}   route    Route, e.g. api/test
 * @param  {object}   endpoint Endpoint model from db
 * @return {undefined}
 */
function _changeDataHandler(req, res, next, username, route, endpoint) {

  var actions = {
    PUT: methodController.updateData,
    DELETE: methodController.deleteData
  };

  // we need a parameter passed to know what to change
  if (!req.query.id) return reportError(new VError('no query id specified'),
                                        next, 'please specify query id', 400);

  var queryID = parseInt(req.query.id);
  var dataPoint = utils.lookForDataPoint(endpoint.data, queryID);
  if (!dataPoint) return reportError(new VError('no document with ID %s', queryID),
                                     next, 'invalid ID', 400);

  var deleteQuery = {id: queryID};

  utils.removeDataFromDb(username, route, deleteQuery, function(err) {
    if (err) return reportError(new VError(err, 'failed to remove data from db'), next);
    actions[req.method](req, res, next, username, route, dataPoint);
  });
}
