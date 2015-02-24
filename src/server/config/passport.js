var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var passport = require('passport');
var request = require('request');
var config = require('../config/env');
var utils = require('../utils');
var User = require('../api/user/userModel');

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

  console.log('github client ID', config.github.clientID);

  console.log('github client secret', config.github.clientSecret);

  // GitHub
  passport.use('github',
    new OAuth2Strategy({
      authorizationURL: 'https://github.com/login/oauth/authorize',
      tokenURL: 'https://github.com/login/oauth/access_token',
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      request({
        method: 'GET',
        uri: 'https://api.github.com/user?access_token=' + accessToken,
        headers: {
          'User-Agent': 'Shortly-Express'
        }
      }, function (err, res, body) {
        // Extract username and image URL
        body = JSON.parse(body);
        var user = {
          username: body.login,
          userID: body.id,
          avatar: body.avatar_url /* jshint ignore:line */
        };

        utils.createUserIfNotExistant(user, function(err, hasbeenCreated) {
          done(null, user);
        });
      });
    }
  ));

  //module.exports = Github;

};
