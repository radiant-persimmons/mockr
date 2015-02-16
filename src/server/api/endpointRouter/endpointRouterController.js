var User = require('../user/userModel.js');

var getData = function(req, res, next) {
  var username = req.params.username;
  var path = req.params[0];
  User.findOne({'username': username}, function (err, user) {
    if (err) return res.status(500).end(err);
  
    var endpoint = user.endpoints[path];
    var endpointData = endpoint.data;
    console.log('path', path);
    console.log('user', user);
    console.log('user endpoints', user.endpoints);
    console.log('endpoint', endpoint);
    console.log('endpointData', endpoint.data);
    res.json(endpointData);
  });
};



module.exports = {
  getData: getData
};