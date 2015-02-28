var AuthController = require('./authController.js');
var passport = require('passport');
var cors = require('cors');

module.exports = function(router) {
  router.get('/api/auth/login', AuthController.login);
  router.get('/api/auth/logout', AuthController.logout);

  router.get('/auth/github', passport.authenticate('github', { failureRedirect: '/login' }));

  router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/home');
    });

};
