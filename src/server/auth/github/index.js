'use strict';

var router = require('express').Router();
var passport = require('passport');

router
  .get('/', passport.authenticate('github', { failureRedirect: '/login' }));

router
  .get('/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/home');
  });

module.exports = router;
