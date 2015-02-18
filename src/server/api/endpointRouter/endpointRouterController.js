var User = require('../user/userModel.js');
var Endpoint = require('../endpoint/endpointModel.js');

var getData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if(!endpoint) {
      return res.status(500).end(err);
    } else {
      var endpointBody = endpoint.body;
      var endpointBodyParsed = JSON.parse(endpointBody);
      console.log("endpoint methods", endpoint.methods);
      console.log("endpoint methods parsed", JSON.parse(endpoint.methods))
      console.log("endpoint body", endpointBody );
      console.log("endpoint body parsed", JSON.parse(endpointBody) );
      console.log("method", method);
      console.log("route on endpointbody", endpointBody[route] );
      console.log("route on endpointbodyParsed", endpointBodyParsed[route] );
      res.json(endpointBodyParsed);
    }
  });
};



module.exports = {
  getData: getData
};