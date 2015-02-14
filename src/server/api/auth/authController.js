var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var config = require('../../config/env');

  //initialize passport
  //app.use(passport.initialize());

  //use sessions on passport
  //app.use(passport.session());


var login = function(req, res, next) {
  res.redirect('/auth/github');
};

var authentication = function(req, res, next) {
  console.log('inside authentication');
  return passport.authenticate('github', { failureRedirect: '/login' }), 
  function(req, res){
    console.log('inside authenticate function');
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  };
};

var authenticationCallback = function(req, res, next) {
  console.log('callback');
  return passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  };
};

module.exports = {
  login: login,
  authentication: authentication,
  authenticationCallback: authenticationCallback
};