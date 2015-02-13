var AuthController = require('./authController.js');

module.exports = function(router) {
  router.route('/api/auth/login')
    .post(AuthController.login)

  router.get('/auth/github', AuthController.authentication);

  router.get('/auth/github/callback', AuthController.authenticationCallback);

};