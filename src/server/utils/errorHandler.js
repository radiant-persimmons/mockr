'use strict';

module.exports = function(err, req, res, next) {
  // defaults
  err.status = err.status || 500;
  err.message = err.message || 'An internal error occurred.';

  // log error
  console.error('-----------------');
  console.error('[' + new Date(Date.now()) + ']: ' + err.toString());

  // log innermost stack
  var deepestErr = err;
  var stack = '';
  while (deepestErr) {
    stack = deepestErr.stack;
    // Causes in `verror` stored under `.we_cause` or `.jse_cause`
    deepestErr = deepestErr.we_cause || deepestErr.jse_cause;
  }
  console.error(stack + '\n-----------------');

  // send error
  res.status(err.status);
  res.json({ message: err.message });
};
