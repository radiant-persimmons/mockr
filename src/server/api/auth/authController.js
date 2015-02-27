var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var config = require('../../config/env');

module.exports = {
  login: login,
  logout: logout,
  authentication: authentication,
  authenticationCallback: authenticationCallback
};

function login(req, res, next) {
  console.log('getting a redirect');
  res.redirect('/auth/github');
}

function logout(req, res, next) {
  console.log('destroying session');
  req.session.destroy(function() {
    res.redirect('/');
  });
}

function authentication(req, res, next) {
  console.log('inside authentication');
  return passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res){
    console.log('inside authenticate function');
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  };
}

function authenticationCallback(req, res, next) {
  console.log('callback');
  return passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/home');
  };
}
