var mongoose = require('mongoose');
var db = require('../../db');

var endpointSchema = mongoose.Schema({
  route: { type: String, required: true },
  method: { type: String, required: true },
  responseStatus: { type: Number, required: true },
  header: { type: String },
  body: { type: String, required: true }
});

var Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = Endpoint;
