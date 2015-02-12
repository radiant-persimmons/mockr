'use strict';

var express  = require('express');
var app = express();
var config = require('./config/env');

require('./routes')(app);

app.listen(config.port, function() {
  console.log('listening on port ', config.port);
});

module.exports = app;

