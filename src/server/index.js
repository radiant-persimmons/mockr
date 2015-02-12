(function() {
  'use strict';

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  var express  = require('express');
  var env      = require('./env');
  var app = express();

  env(app)

  app.listen(app.get('port'), function() {
    console.log('listening on port ', app.get('port'));
  });

})();