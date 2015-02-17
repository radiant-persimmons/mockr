var mongoose = require('mongoose');
var db = require('../../db');

var endpointSchema = mongoose.Schema({
  username: { type: String, required: true },
  route: { type: String, required: true },
  method: { type: String, required: true },
  responseStatus: { type: Number, required: true },
  header: { type: String },
  body: { type: String }
});

var Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = Endpoint;
