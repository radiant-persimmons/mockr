var mongoose = require('mongoose');
//var config = require('../config/environment');

//mongoose.connect(config.mongo.uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function (cb) {
  console.log('connected to mongodb');
});

module.exports = db;