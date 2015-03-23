var verror = require('verror');

/**
 * Convenience utility to wrap an error, set its status code, and pass along
 * to next middleware
 * @param  {Error}    err     Original error
 * @param  {Function} next    middleware
 * @param  {String}   message [opt] Wrapper message
 * @param  {Number}   status  Status number for response
 * @return {undefined}
 */
module.exports = function(err, next, message, status) {
  // set defaults
  message = message || 'Internal server error';
  status = status || 500;

  // wrap error
  var wrappedErr = new verror.WError(err, message);
  wrappedErr.status = status;

  // pass to error handler
  next(wrappedErr);
};
