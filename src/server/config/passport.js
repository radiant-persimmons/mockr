var GithubStrategy = require('passport-github').Strategy;
var passport = require('passport');
var config = require('../config/env');

module.exports.GithubStrategy = new GithubStrategy({
  consumerKey: config.fitbit.id,
  consumerSecret: config.fitbit.secret,
  callbackURL: '/auth/github/callback',
  userAuthorizationURL: 'https://www.github.com/oauth/authorize'
  }, function (token, tokenSecret, profile, done) {    
    User.findOrCreate({ userId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }),
});