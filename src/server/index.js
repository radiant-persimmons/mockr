var express  = require('express');
var app = express();

// Configure express
require('./config/express.js')(app);

// Load routes onto app
require('./routes')(app);

// Listen to port
app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

module.exports = app;
