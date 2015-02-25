var User = require('../user/userModel.js');
var Endpoint = require('../endpoint/endpointModel.js');
var url = require('url');
var logic = require('../../utils/businessLogic.js');
var utils = require('../../utils');

var getData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;
  var data;
  console.log("now", Date.now() );
  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if(!endpoint) {
      return res.status(500).end(err);
    } else {
      //if persistance is set to true, we let the user persist data through their API endpoint
      if(endpoint.persistence === true) {

        //if we have params, get specific data from data inserted through API created
        if(req.query.id) {
          var queryID = parseInt(req.query.id);
          for(var i=0; i<endpoint.data.length; i++) {
            var dataPoint = endpoint.data[i];
            if(dataPoint.id === queryID) {
              return res.status(200).json(dataPoint);
            }
          }
          return res.status(500).end();
        } else {
          data = endpoint.data;
          //if it has createdAt or updatedAt
          if(req.query.createdAt || req.query.updatedAt) {
            var queryParam = req.query.createdAt || req.query.updatedAt;
            if(queryParam === 'ASC') {

            } else if(queryParam === 'DESC') {
              var dataSorted = data.sort(function(a, b) {
                return b.createdAt - a.createdAt;
              });
              data = dataSorted;
            }
          }
          if(req.query.start) {
            data = data.slice(req.query.start);
          } 
          if(req.query.size) {
            data = data.slice(0, req.query.size);
          }
          //get data from data inserted through API created
          
          return res.status(200).json(data);
        }
      } else {
        //TODO check if we have nested object with that method
        if(!endpoint.methods[method]) return res.status(500).end();
        //add headers in the response
        var statusCode = endpoint.methods[method].status;
        //get data from user input
        data = endpoint.methods[method].data;
        return res.status(statusCode).json(data);
      }
    }
  });
};

var postData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;
  var currentTime = Date.now();

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if(!endpoint) {
      return res.status(500).end(err);
    } else {

      //if persistance is set to true, we let the user persist data through their API endpoint
      if(endpoint.persistence === true) {
        //run business logic

        //get business logic from db and pass it

        logic.runLogic(endpoint.businessLogic, req, function(err, newContent) {
          if(err) return res.status(500).json(err);
          if(newContent.res) return res.status(500).json(newContent.res);
          console.log('result--_>', newContent);

          //var newContent = req.body;

          //TODO --> we could do some data validation in here, checking for specific key-value pairs that the user passed through the UI
          //TODO --> Have to save to db the increment of the count
          newContent.id = endpoint.count;
          newContent.createdAt = currentTime;
          newContent.updatedAt = currentTime;

          //for(var column in newContent) {
            //if(!endpoint.schemaDB[column]) {
              //console.log('before deleting', newContent);
              //delete newContent[column];
              //console.log('after deleting newContent', newContent);
            //}
          //}
          //update endpoint.data of that endpoint
          Endpoint.update({ 'username': username, 'route': route }, {$push: {'data': newContent}}, function(err, numAffected, rawResponse) {
            if (err) return res.status(500).json(err); 
            console.log(numAffected, rawResponse);
            //update count of objects in db
            Endpoint.update({ 'username': username, 'route': route }, {$set: {'count': ++endpoint.count}}, function(err, numAffected, rawResponse) {
              return res.status(201).end();
            });
          }); 
        });
      } else {
        if(!endpoint.methods[method]) return res.status(500).end();
        var statusCode = endpoint.methods[method].status;
        //get data from user input
        var data = endpoint.methods[method].data;
        return res.status(statusCode).json(data);
      }
    }
  });
};

var changeData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;
  var currentTime = Date.now();

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if(!endpoint) {
      return res.status(500).end(err);
    } else {
      console.log('method', method);

      //if persistance is set to true, we let the user persist data through their API endpoint
      if(endpoint.persistence === true) {
        //we need a parameter passed to know what to change
        if(!req.query.id) {
          //we need some data to know what to look for
          return res.status(500).end();
        } else {
          var newContent = req.body;

          //for(var column in newContent) {
          //  if(!endpoint.schemaDB[column]) {
          //    delete newContent[column];
          //  }
          //}
          newContent.updatedAt = currentTime;

          var queryID = parseInt(req.query.id);
          var deleteQuery = {id: queryID};

          var updateHandler = function(err, numAffected, rawResponse) {
            if (err) return res.status(500).json(err);
            console.log(numAffected, rawResponse);
            Endpoint.update({ 'username': username, 'route': route }, {$push: {'data': newContent} }, function(err, numAffected, rawResponse) {
              if (err) return res.status(500).json(err);
              console.log(numAffected, rawResponse);
              return res.status(201).end();
            });
          };

          for(var i = 0; i < endpoint.data.length; i++) {
            var dataPoint = endpoint.data[i];
            if(dataPoint.id === queryID) {
              //update data
              //delete dataPoint;
              Endpoint.update({ 'username': username, 'route': route }, {$pull: {'data': deleteQuery} }, updateHandler);
            }
          }
          return res.status(500).end();
        }
      } else {
        if(!endpoint.methods[method]) return res.status(500).end();
        var statusCode = endpoint.methods[method].status;
        //get data from user input
        //check what verb is normally used?? PUT or PATCH
        var data = endpoint.methods[method].data;
        return res.status(statusCode).json(data);
      }
    }
  });
};

var deleteData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if(!endpoint) {
      return res.status(500).end(err);
    } else {

      var updateHandler = function(err, numAffected, rawResponse) {
        if (err) return res.status(500).json(err);
        console.log('data pull successul');
        console.log(numAffected, rawResponse);
        return res.status(201).end();
      };

      //if persistance is set to true, we let the user persist data through their API endpoint
      if(endpoint.persistence === true) {
        //we need a parameter passed to know what to change
        if(!req.query.id) {
          //we need some data to know what to look for
          return res.status(500).end();
        } else {
          console.log('gets here');
          var queryID = parseInt(req.query.id);
          var deleteQuery = {id: queryID};
          for(var i = 0; i < endpoint.data.length; i++) {
            var dataPoint = endpoint.data[i];
            if(dataPoint.id === queryID) {
              console.log('passes conditional');
              //delete datapoint passed by the user
              Endpoint.update({ 'username': username, 'route': route }, {$pull: {'data': deleteQuery}}, updateHandler);
            }
          }
          return res.status(500).end();
        }
      } else {
        if(!endpoint.methods[method]) return res.status(500).end();
        var statusCode = endpoint.methods[method].status;
        //get data from user input
        var data = endpoint.methods[method].data;
        return res.status(statusCode).json(data);
      }
    }
  });
};


module.exports = {
  getData: getData,
  postData: postData,
  changeData: changeData,
  deleteData: deleteData
};
