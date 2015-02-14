var userController = require('./userController')

module.exports = function(router) {
  router.route('/api/users')
    .get(userController.getUsers)
    .post(userController.createUser);

  router.route('/api/users/:username')
    .get(userController.getUser)
    .put(userController.editUser)
    .delete();
};