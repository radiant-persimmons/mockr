var mongoose = require('mongoose');
var db = require('../db');

var userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  endpoints: {}
});

var User = mongoose.model('User', userSchema);

module.exports = User;

