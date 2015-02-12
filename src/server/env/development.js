(function() {
  'use strict';

  var express = require('express')

  module.exports = function(app) {
    var reloader = require('connect-livereload');
    app.use(reloader());

    app.set('port', 9000)

    app.set('env'    , 'development');
    app.set('appPath', './build');
    app.use(express.static('./build'));
  }
})();