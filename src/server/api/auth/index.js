var AuthController = require('./authController.js');
var passport = require('passport');

module.exports = function(router) {
  router.get('/api/auth/login', AuthController.login);

  router.get('/auth/github', passport.authenticate('github', { failureRedirect: '/login' }), 
  function(req, res){
    console.log('inside authenticate function');
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

  router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

};