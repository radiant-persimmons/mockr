var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./env');
var session = require('express-session');

module.exports = function expressConfig(app) {
  // standard POST request body parser
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse JSON posts
  app.use(bodyParser.json());

  // HTTP request logger middleware
  app.use(morgan('combined'));

  // set view directory
  app.set('views', __dirname + '/../views');

  // set default server side view engine
  app.set('view engine', 'jade');

  // set static asset dir
  app.use(express.static(__dirname + '/../../../build/'));

  app.use(session({
    secret: config.expressSessionSecret || 'meow',
    resave: false,
    saveUninitialized: true
  }));

  // dynamically set port if in production otherwise use port 3000
  app.set('port', config.port);
  app.set('jwtTokenSecret', config.jwtTokenSecret);

  // Seed database if specified
  if (config.seedDB) {
    console.log('Seeding database...');
    require('./seed');
  }
};