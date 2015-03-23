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

function getData(req, res, next, username, route, method, endpoint) {

  // apply queries passed through the endpoint url
  var data = utils.applyQueries(req, endpoint.data);
  if (!data) return reportError(new VError('no endpoint data for /%s/%s', username, route),
                                next, 'Failed to get endpoint data', 400);
  return res.status(200).json(data);

}

function postData(req, res, next, username, route, method, endpoint) {

  //run business logic
  logic.runLogic(endpoint.businessLogic, req, function(err, newContent) {
    if (err) return reportError(new VError(err, 'failed to run business logic'),
                                next, 'Failed to post data', 500);

    if (newContent.res) return res.status(500).json(newContent.res);

    newContent = utils.augmentPostData(newContent, endpoint);

    //update endpoint.data of that endpoint
    utils.insertPostDataToDb(username, route, newContent, function(err) {
      if (err) return reportError(new VError(err, 'failed to set new data in db'),
                                  next, 'Failed to post data', 500);

      //update count of objects in db
      utils.updateObjectCount(username, route, endpoint, function(err) {
        if (err) return reportError(new VError(err, 'db error failed to update object count'),
                                    next, 'Failed to post data', 500);

        return res.status(201).end();
      });
    });
  });
}

function updateData(req, res, next, username, route, queryID, dataPoint) {

  var newContent = utils.updateData(req.body, dataPoint);
  //delete dataPoint;
  var deleteQuery = {id: queryID};

  utils.removeDataFromDb(username, route, deleteQuery, function(err) {
    if (err) return reportError(new VError(err, 'failed to remove data from db'),
                                next, 'Failed to update data', 500);

    utils.insertPostDataToDb(username, route, newContent, function(err) {
      if (err) return reportError(new VError(err, 'failed to insert new data to db'),
                                  next, 'Failed to update data', 500);

      return res.status(201).end();
    });
  });
}

function deleteData(req, res, next, username, route, queryID, dataPoint) {
  var deleteQuery = {id: queryID};

  utils.removeDataFromDb(username, route, deleteQuery, function(err) {
    if (err) return reportError(err, next, 'Failed to delete data', 500);
    return res.status(201).end();
  });
}
