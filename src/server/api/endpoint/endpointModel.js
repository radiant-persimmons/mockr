var mongoose = require('mongoose');
var db = require('../../db');

var endpointSchema = mongoose.Schema({
  username: { type: String, required: true },
  route: { type: String, required: true },
  methods: {},
  persistance: { type: Boolean, default: false },
  data: [],
  count: { type: Number, default: 0 }
});

var Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = Endpoint;
