var mongoose = require('mongoose');
var db = require('../db');

var endpointSchema = mongoose.Schema({
});

var Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = Endpoint;