module.exports = function(router) {
  router.route('/api/users')
    .get()
    .post();

  router.route('/api/users/:username')
    .get()
    .put()
    .delete();
};