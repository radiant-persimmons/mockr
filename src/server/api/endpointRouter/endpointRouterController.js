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
      var statusCode = endpoint.methods[method].status;
      var data = endpoint.methods[method].data;
      res.status(statusCode).json(data);
    }
  });
};



module.exports = {
  getData: getData
};