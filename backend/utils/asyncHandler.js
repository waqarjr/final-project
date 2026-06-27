/**
 * asyncHandler — wraps async route handlers to automatically catch
 * rejected promises and forward errors to the global error handler.
 *
 * Usage:  router.get('/path', asyncHandler(myAsyncFn));
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
