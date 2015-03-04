var _ = require('lodash');
var User = require('../user/userModel.js');
var Endpoint = require('../endpoint/endpointModel.js');
var url = require('url');
var logic = require('../../utils/businessLogic.js');
var utils = require('../../utils');
var _ = require('lodash');

var getData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;
  var data;
  
  var day = utils.getDay();

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if (!endpoint) {
      return res.status(500).end(err);
    } else {
      endpoint.analytics[method][day] += 1;

      Endpoint.update({ 'username': username, 'route': route }, { $set: {'analytics': endpoint.analytics }}, function(err, numAffected, rawResponse) {
        if (err) return res.status(500).json(err); 

        //if persistance is set to true, we let the user persist data, manipulate it and read it through their API endpoint
        if(endpoint.persistence === true) {
          //apply queries passed through the endpoint url
          var data = utils.applyQueries(req, endpoint.data);
          if(!data) {
            return res.status(500).end();
          }
          return res.status(200).json(data);

        //else, if persistance is set to false
        } else {
          //TODO check if we have nested object with that method
          //if GET method data hasn't been set, end response
          if (!endpoint.methods[method]) return res.status(500).end();
          //add headers in the response

          //get statusCode and data from user input
          var statusCode = endpoint.methods[method].status;
          data = endpoint.methods[method].data;
          return res.status(statusCode).json(data);
        }
      });
    }
  });
};

var postData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;

  var day = utils.getDay();

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if (!endpoint) {
      return res.status(500).end(err);
    } else {
      endpoint.analytics[method][day] += 1;

      Endpoint.update({ 'username': username, 'route': route }, {$set: {'analytics': endpoint.analytics }}, function(err, numAffected, rawResponse) {
        if (err) return res.status(500).json(err); 
        //if persistance is set to true, we let the user persist data through their API endpoint
        if (endpoint.persistence === true) {
          //run business logic
          logic.runLogic(endpoint.businessLogic, req, function(err, newContent) {
            if (err) return res.status(500).json(err);
            if (newContent.res) return res.status(500).json(newContent.res);

            newContent = utils.augmentPostData(newContent, endpoint);

            //update endpoint.data of that endpoint
            utils.insertPostDataToDb(username, route, newContent, function(err) {
              if (err) return res.status(500).json(err); 

              //update count of objects in db
              utils.updateObjectCount(username, route, endpoint, function(err) {
                if (err) return res.status(500).json(err); 
                return res.status(201).end();
              })
            }); 
          });
        } else {
          //if GET method data hasn't been set, end response
          if (!endpoint.methods[method]) return res.status(500).end();

          //get statusCode and data from user input
          var statusCode = endpoint.methods[method].status;
          var data = endpoint.methods[method].data;
          return res.status(statusCode).json(data);
        }
      });
    }
  });
};

var changeData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;

  var day = utils.getDay();

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if (!endpoint) {
      return res.status(500).end(err);
    } else {
      endpoint.analytics[method][day] += 1;

      Endpoint.update({ 'username': username, 'route': route }, { $set: {'analytics': endpoint.analytics }}, function(err, numAffected, rawResponse) {
        if (err) return res.status(500).json(err); 
        //if persistance is set to true, we let the user persist data through their API endpoint
        if (endpoint.persistence === true) {
          //we need a parameter passed to know what to change
          if (!req.query.id) {
            return res.status(500).end();
          } else {
            var queryID = parseInt(req.query.id);
            var dataPoint = utils.lookForDataPoint(endpoint.data, queryID);
            if(!dataPoint) {
              return res.status(500).end();
            }

            newContent = utils.updateData(req.body, dataPoint);
            //delete dataPoint;
            var deleteQuery = {id: queryID};

            utils.removeDataFromDb(username, route, deleteQuery, function(err) {
              if (err) return res.status(500).json(err);
              utils.insertPostDataToDb(username, route, newContent, function(err) {
                if (err) return res.status(500).json(err);
                return res.status(201).end();
              });
            });
          }
        } else {
          if (!endpoint.methods[method]) return res.status(500).end();

          //get statusCode and data from user input
          var statusCode = endpoint.methods[method].status;
          var data = endpoint.methods[method].data;
          return res.status(statusCode).json(data);
        }
      });
    }
  });
};

var deleteData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;

  var day = utils.getDay();

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if (!endpoint) {
      return res.status(500).end(err);
    } else {
      endpoint.analytics[method][day] += 1;

      Endpoint.update({ 'username': username, 'route': route }, { $set: {'analytics': endpoint.analytics }}, function(err, numAffected, rawResponse) {
        if (err) return res.status(500).json(err); 
        //if persistance is set to true, we let the user persist data through their API endpoint
        if (endpoint.persistence === true) {
          //we need a parameter passed to know what to change
          if (!req.query.id) {
            //if no id is passed in the url endpoint, end connection
            return res.status(500).end();
          } else {
            var data = endpoint.data;
            var queryID = parseInt(req.query.id);
            var dataPoint = utils.lookForDataPoint(data, queryID);
            if(!dataPoint) {
              return res.status(500).end();
            }

            var deleteQuery = {id: queryID};

            utils.removeDataFromDb(username, route, deleteQuery, function(err) {
              if (err) return res.status(500).json(err);
              return res.status(201).end();
            });
          }
        } else {
          if(!endpoint.methods[method]) return res.status(500).end();

          //get statusCode and data from user input
          var statusCode = endpoint.methods[method].status;
          var data = endpoint.methods[method].data;
          return res.status(statusCode).json(data);
        }
      });
    }
  });
};


module.exports = {
  getData: getData,
  postData: postData,
  changeData: changeData,
  deleteData: deleteData
};
