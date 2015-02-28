var userController = require('./userController');
var auth = require('../auth/authController');

module.exports = function(router) {
  // Returns session user
  router.route('/api/user')
    .get(userController.getCurrentUser);

  router.route('/api/users')
    .get(userController.getUsers)
    .post(userController.createUser); //not used, user will be created automatically when logged in with passport

  router.route('/api/users/:username')
    .get(auth.isAuthenticatedUser, userController.getUser)
    .put(auth.isAuthenticatedUser, userController.editUser)
    .delete();
};
