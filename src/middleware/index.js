const { paginationMiddleware } = require('./pagination');
const { authMiddleware } = require('./session');

module.exports = {
  authMiddleware,
  paginationMiddleware,
}