var mongoose = require('mongoose');
var db = require('../db');

var userSchema = mongoose.Schema({
});

var User = mongoose.model('User', userSchema);

module.exports = User;

