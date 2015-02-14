var userController = require('./userController')

module.exports = function(router) {
  router.route('/api/users')
    .get(userController.getUsers) 
    .post(userController.createUser); //not used, user will be created automatically when logged in with passport

  router.route('/api/users/:username')
    .get(userController.getUser)
    .put(userController.editUser)
    .delete();
};