var vm = require('vm');
//var VM = require('vm2').VM;

var runLogic = function(logic, req, cb) {
  console.log('before');
  var options = {
  	timeout: 100
  };

  try {
    vm.runInNewContext(logic, req.body, {timeout: '1000'});  
    console.log('reult inside helper', req.body);
    cb(null, req.body);
  } catch(e) {
    console.log('error', e);
    cb(e, null);
  }

  console.log(req.body.that);
  console.log(req.body);
  return req.body;
};

//var runLogic = function(logic, req) {
  //var options = {
    //timeout: 1000,
    //sandbox: req
  //};

  //var vm = new VM(options);
  //vm.run(logic);
//};

module.exports = {
  runLogic: runLogic
};