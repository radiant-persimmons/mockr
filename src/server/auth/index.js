
var express = require('express');
var passport = require('passport');
var config = require('../config/env');
var User = require('../api/user/userModel');
var authController = require('./authController');

module.exports = function(app) {

  //initialize passport
  app.use(passport.initialize());

  //use sessions on passport
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.userID);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({userID: id}, function(err, user) {
      done(err, user);
    });
  });

  // Configure passport for routers
  require('./github/passport').setup(passport, config);

  // Set passport routers onto router
  var router = express.Router();
  router.use('/github', require('./github'));

  // Establish logout route
  router.get('/logout', authController.logout);

  return router;

};
