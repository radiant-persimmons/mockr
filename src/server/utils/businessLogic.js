//var vm = require('vm');
var VM = require('vm2').VM;

//var runLogic = function(logic, req) {
  //req.body.that = "hola";
  //var options = {
  	//timeout: 100
 // }
  //vm.runInNewContext(logic, req, {timeout: '1000'});
  //console.log(req.body.that);
  //console.log(req.body);
  //return req.body;
//};

var runLogic = function(logic, req) {
  var options = {
    timeout: 1000,
    sandbox: req
  };

  var vm = new VM(options);
  vm.run(logic);
};

module.exports = {
  runLogic: runLogic
};