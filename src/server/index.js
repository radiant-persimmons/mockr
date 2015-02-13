'use strict';

var express  = require('express');
var app = express();
var config = require('./config/env');

require('./config/express.js')(app);
require('./routes')(app);

app.listen(app.get('port'), function() {
  console.log('listening on port ', app.get('port'));
});

module.exports = app;
