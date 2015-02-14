var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var passport = require('passport');
var config = require('../config/env');

module.exports = function(app) {

  //initialize passport
  app.use(passport.initialize());

  //use sessions on passport
  //app.use(passport.session());

  console.log('github client ID', config.github.clientID);

  console.log('github client secret', config.github.clientSecret);

  // GitHub
  passport.use('github',
    new OAuth2Strategy({
      authorizationURL: 'https://github.com/login/oauth/authorize',
      tokenURL: 'https://github.com/login/oauth/access_token',
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: 'http://localhost:4000/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ userId: profile.id }, function (err, user) {
        console.log('err', error);
        console.log('user', user);
        return done(err, user);
      });
    }
  ));

  //module.exports = Github;

};