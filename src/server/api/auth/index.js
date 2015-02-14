var AuthController = require('./authController.js');

module.exports = function(router) {
  router.get('/api/auth/login', AuthController.login)

  router.get('/auth/github', AuthController.authentication);

  router.get('/auth/github/callback', AuthController.authenticationCallback);

};