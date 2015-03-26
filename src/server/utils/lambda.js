var lambda = require('lambdaws').create;

//TODO --> uploadLogic when editing endpoint and not on the moment the business logic is run
var uploadLogic = function(businessLogic) {
  return λ(businessLogic);

};

var runLogic = function(logic, req, cb) {
  var cloudedBusinesslogic = uploadLogic(logic);
  cloudedBusinessLogic(req.body, function(err, data) {
    console.log('data result', data);
    if(err) {
      return cb(err);
    }
    cb(null, data);
  });
};

module.exports = {
  runLogic: runLogic
};