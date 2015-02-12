(function() {

  var join = require('path').join;

  module.exports = function(app) {

    var env = join(__dirname, './', process.env.NODE_ENV+'.js')
    require(env)(app);
  }

})()