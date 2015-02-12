(function() {
  'use strict';

  var express = require('express')

  module.exports = function(app) {

    app.set('port', process.env.PORT || 9000);

    app.set('env'    , 'stage');
    app.set('appPath', './build');
    app.use(express.static('./build'));
  }
})();