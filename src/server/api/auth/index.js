var AuthController = require('./authController.js');

module.exports = function(router) {
  router.route('/api/auth/signup')
    .post(AuthController.signup);

  router.route('/api/auth/login')
    .post(AuthController.login)

  router.get('/auth/github', AuthController.authentication);

  app.get('/auth/github/callback', AuthController.authenticationCallback);

};