var User = require('../user/userModel.js');

var getData = function(req, res, next) {
  var username = req.params.username;
  var path = req.params[0];
  User.findOne({'username': username}, function (err, user) {
    if (err) return res.status(500).end(err);
  
    var endpoint = user.endpoints[path];
    var endpointData = endpoint.data;
    res.json(endpointData);
  });
};



module.exports = {
  getData: getData
};