var passport = require('passport');


var login = function(req, res, next) {
  res.redirect('/auth/github');
};

var authentication = function(req, res, next) {
  passport.authenticate('github', { failureRedirect: '/login' }), 
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
};

var authenticationCallback = function(req, res, next) {
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
};

module.exports = {
  login: login,
  authentication: authentication,
  authenticationCallback: authenticationCallback
}