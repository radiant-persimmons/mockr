var GithubStrategy = require('passport-github').Strategy;
var passport = require('passport');
var config = require('../config/env');

module.exports = function(app) {

  //initialize passport
  app.use(passport.initialize());

  //use sessions on passport
  app.use(passport.session());

  console.log('github client ID', config.github.clientID);

  console.log('github client secret', config.github.clientSecret);

  //var Github = new GithubStrategy({
    //consumerKey: config.github.clientID,
    //consumerSecret: config.github.clientSecret,
    //callbackURL: '/auth/github/callback',
    //userAuthorizationURL: 'https://www.github.com/oauth/authorize'
    //}, function (token, tokenSecret, profile, done) {    
      //User.findOrCreate({ userId: profile.id }, function (err, user) {
        //return done(err, user);
      //});
    //}
  //);

  //passport.use(Github);

  //module.exports = Github;

};