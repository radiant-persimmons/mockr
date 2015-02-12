(function() {

  var join = require('path').join;

  module.exports = function(app) {

  	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    var env = join(__dirname, './', process.env.NODE_ENV+'.js')
    require(env)(app);
  }

})()

