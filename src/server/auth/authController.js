'use strict';

var reportError = require('../utils/errorReporter');

module.exports = {
  isAuthenticatedUser: isAuthenticatedUser,
  logout: logout,
  restricted: restricted
};

////////////

/**
 * Routes that require the session user to be the user on the route path
 */
function isAuthenticatedUser(req, res, next) {
  if (req.user && req.params.username === req.user.username) {
    next();
  } else {
    reportError(new Error('Session user does not match route username parameter'), next, 'Access forbidden', 401);
  }
}

/**
 * Log out user
 */
function logout(req, res, next) {
  req.session.destroy(function() {
    res.redirect('/');
  });
}

/**
 * Routes that require a user session
 */
function restricted(req, res, next) {
  if (req.user) {
    next();
  } else {
    reportError(new Error('No session exists; user not authenticated'), next, 'Access forbidden', 401);
  }
}
