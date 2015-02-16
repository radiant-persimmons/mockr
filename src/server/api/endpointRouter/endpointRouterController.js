var User = require('../user/userModel.js');
var Endpoint = require('../endpoint/endpointModel.js');

var getData = function(req, res, next) {
  console.log('req -->', req);
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;

  Endpoint.findOne({ 'username': username, 'route': route, 'method': method }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if(!endpoint) {
      return res.status(500).end(err);
    } else {
      var endpointBody = endpoint.body;
      res.json(endpointBody);
    }
  });
};



module.exports = {
  getData: getData
};