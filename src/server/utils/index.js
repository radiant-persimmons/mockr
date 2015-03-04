var User = require('../api/user/userModel.js');
var Endpoint = require('../api/endpoint/endpointModel.js');
var _ = require('lodash');

var createUserIfNotExistant = function(user, cb) {
  User.findOneAndUpdate({ username: user.username }, user,
                        { upsert: true }, function(err, numAffected, raw) {
    if (err) return cb(err, null);
    return cb(null, user);
  });
};

var applyQueries = function(req, data) {
  //if there's and id in the params, get that specific object from the data inserted through API
  if (req.query.id) {
    var queryID = parseInt(req.query.id);
    var dataPoint = lookForDataPoint(data, queryID);
    return dataPoint;
  }
  //check if request url contains createdAt or updatedAt params
  if (req.query.createdAt || req.query.updatedAt) {
    var queryParam = req.query.createdAt || req.query.updatedAt;
    if (queryParam === 'ASC') {
      data = data.sort(function(a, b) {
        return a.createdAt - b.createdAt;
      })
    } else if (queryParam === 'DESC') {
      //order data from bigger to smaller
      data = data.sort(function(a, b) {
        return b.createdAt - a.createdAt;
      });
    }
  }
  //check if request url contains start param
  if (req.query.start) {
    data = data.slice(req.query.start);
  } 
  //check if request url contains size param
  if (req.query.size) {
    data = data.slice(0, req.query.size);
  }

  return data;
};

var lookForDataPoint = function(data, id) {
  for (var i=0; i<data.length; i++) {
    var dataPoint = data[i];
    if (dataPoint.id === id) {
      return dataPoint;
    }
  }
  return null;
}

var updateObjectCount = function(username, route, endpoint, cb) {
  Endpoint.update({ 'username': username, 'route': route }, {$set: {'count': ++endpoint.count}}, function(err, numAffected, rawResponse) {
	cb(err);
  });
};

var augmentPostData = function(newContent, endpoint) {
  var currentTime = getTime();

  newContent.id = endpoint.count;
  newContent.createdAt = currentTime;
  newContent.updatedAt = currentTime;

  return newContent;
};

var insertPostDataToDb = function(username, route, newContent, cb) {
  //update endpoint.data of that endpoint
  Endpoint.update({ 'username': username, 'route': route }, { $push: {'data': newContent}}, function(err, numAffected, rawResponse) {
    cb(err);
  });  
};

var removeDataFromDb = function(username, route, deleteQuery, cb) {
  Endpoint.update({ 'username': username, 'route': route }, { $pull: {'data': deleteQuery}}, function(err, numAffected, rawResponse) {
    cb(err);
  });
};

var updateData = function(newContent, oldContent) {
  newContent.updatedAt = getTime();
  _.defaults(newContent, oldContent);
  return newContent;
};

var getTime = function() {
  return Date.now();
};

var getDay = function() {

};

module.exports = {
  createUserIfNotExistant: createUserIfNotExistant,
  applyQueries: applyQueries,
  lookForDataPoint: lookForDataPoint,
  updateObjectCount: updateObjectCount,
  augmentPostData: augmentPostData,
  insertPostDataToDb: insertPostDataToDb,
  removeDataFromDb: removeDataFromDb,
  getTime: getTime,
  updateData: updateData,
  getDay: getDay
};

