/******************************************************************************
 * seed.js
 * =======
 * Provides seed data for database. Called through express.js.
 *****************************************************************************/

var _ = require('lodash');

 // Drop database so schemas can reload
var mongoose = require('../db/index.js');
 mongoose.db.dropDatabase();

// Load schemas
var User = require('../api/user/userModel');
var Endpoint = require('../api/endpoint/endpointModel');

console.log('Seeding database...');

// Clear endpoints
Endpoint.find({}).remove(function() {
  Endpoint.create({
    username: 'AndrewSouthpaw',
    route: 'api/messages',
    methods: { GET: { status: 200, headers: {}, data: '[{ message: "Hello world" }, { message: "I am Andrew" }]' }, POST: { status: 201, header: {}, data: '' }, PUT: { status: 201, header: {}, data: '' }, DELETE: { status: 201, header: {}, data: '' } },
    persistence: true,
    data: [{ id: 1, msg: 'Hola' }, { id: 2, msg: 'Buenos dias'}],
    count: 2
  }, {
    username: 'AndrewSouthpaw',
    route: 'api/rooms',
    methods: { GET: { status: 200, headers: {}, data: '["lobby", "coolpeeps"]' } },
    persistence: false,
    data: [],
    count: 0
  }, function(err, e1, e2) {
    console.log('\n\nCreated endpoints:\n', e1, e2);

    // Grab endpoint IDs to give to user
    var endpointIDs = _.pluck([e1, e2], '_id');

    // Create users
    User.find({}).remove(function() {
      User.create({
        username: 'AndrewSouthpaw',
        userID: 5187404,
        endpoints: endpointIDs
      }, {
        username: 'Ruben',
        userID: 2,
        endpoints: []
      }, function(err, u1, u2) {
        console.log('\n\nCreated users:\n', u1, u2);
        console.log('Finished seeding database');
      });
    });
  });
});

User.find({}).remove(function() {
});
