'use strict';

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
    res.status(401).json({ message: 'Not authenticated' });
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
    res.status(401).json({ message: 'Not authenticated' });
  }
}
