var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./env');
var session = require('express-session');
var cors = require('cors');

module.exports = function expressConfig(app) {
  // standard POST request body parser
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse JSON posts
  app.use(bodyParser.json());

  // HTTP request logger middleware
  app.use(morgan('combined'));

  // Attach CORS headers
  app.use(cors());

  // set static asset dir
  app.use(express.static(__dirname + '/../../../build/'));

  app.use(session({
    secret: config.expressSessionSecret,
    resave: false,
    saveUninitialized: true
  }));

  // dynamically set port if in production otherwise use port 3000
  app.set('port', config.port);
  app.set('jwtTokenSecret', config.jwtTokenSecret);

  // Seed database if specified
  if (config.seedDB) require('./seed');
};
