var vm = require('vm');

var runLogic = function(logic, req) {
  req.body.that = "hola";
  //var logic = '(function(){that = "adios" })()';
  vm.runInNewContext(logic, req);
  console.log(req.body.that);
  console.log(req.body);
  return req.body;
};

module.exports = {
  runLogic: runLogic,
};

var req = {};
req.body = {};
req.that = "hola";
//runLogic('function some() {console.log(1)}', req);


//working
//vm.runInNewContext('that = "adios"', req);
//console.log(req.that);