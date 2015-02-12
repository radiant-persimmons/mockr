module.exports = function(router) {
  router.route('/api/users/:user/endpoints')
    .get()
    .post();

  router.route('/api/users/:user/endpoints/:id')
    .get()
    .put()
    .delete();
};