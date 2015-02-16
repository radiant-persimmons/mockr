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
    username: 'Andrew',
    route: 'api/messages',
    method: 'GET',
    responseStatus: 200,
    header: '',
    body: '[{ message: "Hello world" }, { message: "I am Andrew" }]'
  }, {
    username: 'Andrew',
    route: 'api/messages',
    method: 'POST',
    responseStatus: 201,
    header: '',
    body: 'No mas wey'
  }, {
    username: 'Andrew',
    route: 'api/rooms',
    method: 'GET',
    responseStatus: 200,
    header: '',
    body: '["lobby", "coolpeeps"]'
  }, function(err, e1, e2, e3) {
    console.log('\n\nCreated endpoints:\n', e1, e2, e3);

    // Grab endpoint IDs to give to user
    var endpointIDs = _.pluck([e1, e2, e3], '_id');

    // Create users
    User.find({}).remove(function() {
      User.create({
        username: 'Andrew',
        userID: 1,
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
