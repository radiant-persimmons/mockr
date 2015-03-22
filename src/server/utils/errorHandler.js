'use strict';

module.exports = function(err, req, res, next) {
  // defaults
  err.status = err.status || 500;
  err.message = err.message || 'An internal error occurred.';

  // log error
  console.error('-----------------');
  console.error('[' + new Date(Date.now()) + ']: ' + err.toString());
  console.error('Status: ' + err.status);

  // log innermost stack
  var deepestErr = err;
  var stack = '';
  while (deepestErr) {
    stack = deepestErr.stack;
    deepestErr = deepestErr.cause();
  }
  console.error(stack + '\n-----------------');

  // send error
  res.status(err.status);
  res.json({ message: err.message });
};
