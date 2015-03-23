/**
 * Method controller module. Performs the actual work of GET, PUT, etc., made
 * by the request.
 * @module
 */

var _ = require('lodash');
var VError = require('verror');
var logic = require('../../utils/businessLogic.js');
var utils = require('../../utils');
var reportError = require('../../utils/errorReporter');

module.exports = {
  getData: getData,
  postData: postData,
  updateData: updateData,
  deleteData: deleteData
};

///////////

/**
 * Retrieves data from a persistent endpoint. Allows for user to pass in query
 * parameters.
 * @param  {Object}   req      Request
 * @param  {Object}   res      Response
 * @param  {Function} next     Next
 * @param  {String}   username Username
 * @param  {String}   route    Route, e.g. api/test
 * @param  {Object}   endpoint Endpoint model from db
 * @return {Response}          Endpoint data
 */
function getData(req, res, next, username, route, endpoint) {
  // apply queries passed through the endpoint url
  var data = utils.applyQueries(req, endpoint.data);
  if (!data) return reportError(new VError('no endpoint data for /%s/%s', username, route),
                                next, 'Failed to get endpoint data', 400);
  return res.status(200).json(data);
}

/**
 * Appends a new document to endpoint data after running business logic.
 * @param  {object}   req      Response
 * @param  {object}   res      Request
 * @param  {Function} next     Next
 * @param  {String}   username Username
 * @param  {String}   route    Endpoint route, e.g. api/test
 * @param  {Object}   endpoint Endpoint model from db
 * @return {Response}          Success code 201
 */
function postData(req, res, next, username, route, endpoint) {

  //run business logic
  logic.runLogic(endpoint.businessLogic, req, function(err, newContent) {
    if (err) return reportError(new VError(err, 'failed to run business logic'), next);

    if (newContent.res) return res.status(500).json(newContent.res);

    newContent = utils.augmentPostData(newContent, endpoint);

    //update endpoint.data of that endpoint
    utils.insertPostDataToDb(username, route, newContent, function(err) {
      if (err) return reportError(new VError(err, 'failed to set new data in db'), next);

      //update count of objects in db
      utils.updateObjectCount(username, route, endpoint, function(err) {
        if (err) return reportError(new VError(err, 'db error failed to update object count'), next);

        return res.status(201).end();
      });
    });
  });
}

/**
 * Updates the contents of a document inside endpoint data store. Requires
 * a document ID to identify the correct document and new information to
 * replace its contents
 * @param  {Object}   req       Request
 * @param  {Object}   res       Response
 * @param  {Function} next      Next
 * @param  {String}   username  Username
 * @param  {String}   route     Endpoint route, e.g. api/test
 * @param  {Object}   dataPoint New document to replace existing information
 * @return {Response}           Success 201
 */
function updateData(req, res, next, username, route, dataPoint) {
  var newContent = utils.updateData(req.body, dataPoint);
  utils.insertPostDataToDb(username, route, newContent, function(err) {
    if (err) return reportError(new VError(err, 'failed to insert new data to db'), next);

    return res.status(201).end();
  });
}

/**
 * Deletes a document from the endpoint data store.
 * @param  {Object}   req       Request
 * @param  {Object}   res       Response
 * @param  {Function} next      Next
 * @param  {String}   username  Username
 * @param  {String}   route     Endpoint route, e.g. api/test
 * @param  {Object}   dataPoint New document to replace existing information
 * @return {Response}           Success 201
 */
function deleteData(req, res, next, username, route, dataPoint) {
  /**
   * At this point, all work has already been finished. Only send back
   * successful response.
   */
  return res.status(201).end();
}
