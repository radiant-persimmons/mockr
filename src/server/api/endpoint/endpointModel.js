var mongoose = require('mongoose');
var db = require('../../db');

var endpointSchema = mongoose.Schema({
  username: { type: String, required: true },
  route: { type: String, required: true },
  methods: {},
  headers: { type: String },
  body: {}
});

var Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = Endpoint;
