var mongoose = require('mongoose');
var db = require('../../db');

var endpointSchema = mongoose.Schema({
  username: { type: String, required: true },
  route: { type: String, required: true },
  methods: {},
  persistence: { type: Boolean, default: false },
  schemaDB: {},
  businessLogic: { type : String },
  data: [],
  count: { type: Number, default: 0 },
  analytics: {'GET': 0, 'POST': 0, 'PUT': 0, 'DELETE': 0}
}, { minimize: false });

var Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = Endpoint;
