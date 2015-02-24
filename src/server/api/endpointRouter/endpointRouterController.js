var User = require('../user/userModel.js');
var Endpoint = require('../endpoint/endpointModel.js');
var url = require('url');
var vm = require('vm');
var logic = require('../../utils/businessLogic.js');

var getData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;
  var data;

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
          //add headers in the response
          //get data from data inserted through API created
          data = endpoint.data;
          return res.status(200).json(data);
        }
      } else {
        //TODO check if we have nested object with that method
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
          console.log('result--_>', newContent);

          //var newContent = req.body;

          //TODO --> we could do some data validation in here, checking for specific key-value pairs that the user passed through the UI
          //TODO --> Have to save to db the increment of the count
          newContent.id = endpoint.count++;
          for(var column in newContent) {
            if(!endpoint.schemaDB[column]) {
              console.log('before deleting', newContent);
              delete newContent[column];
              console.log('after deleting newContent', newContent);
            }
          }
          //update endpoint.data of that endpoint
          Endpoint.update({ 'username': username, 'route': route }, {$push: {'data': newContent}}, function(err, numAffected, rawResponse) {
            if (err) return res.status(500).json(err); 
            console.log(numAffected, rawResponse);
            return res.status(201).end();
          }); 
        });
      } else {
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
