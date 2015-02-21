var vm = require('vm');

var runLogic = function(logic, req) {
  var newContext = {};

  newContext.codeToRun = function(reqData) {
    logic.call(null, reqData)//script saved in db
  }; 

  newContext.data = req.body;

  vm.runInNewContext('codeToRun(data)', newContext);
};


module.exports = {
  runLogic: runLogic
};

var req = {};
req.body = {};
req.that = "hola";
//runLogic('function some() {console.log(1)}', req);

vm.runInNewContext('(function(){that = "adios" })()', req);

console.log(req.that);


//working
//vm.runInNewContext('that = "adios"', req);
//console.log(req.that);