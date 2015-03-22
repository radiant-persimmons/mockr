var sinon = require('sinon');

/**
 * Helper to unwrap and re-wrap a method with a callback.
 * @param  {object}   object Object to be stubbed
 * @param  {string}   method Method on the object to be stubbed
 * @param  {function} cb     Optional callback to be the stub
 * @return {undefined}
 */
module.exports = function reloadStub(object, method, cb) {
  if (typeof object === 'undefined' || typeof method === 'undefined') {
    throw new Error('reloadStub expects an object and method');
  } else {
    object[method].restore();
    typeof cb === 'function' ? sinon.stub(object, method, cb)
                             : sinon.stub(object, method);
  }
}
