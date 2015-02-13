var AuthController = require('./authController.js');

module.exports = function(router) {
  router.route('/api/auth/signup')
    .post(AuthController.signup);

  router.route('/api/auth/login')
    .post(AuthController.login)

  router.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

  app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

};