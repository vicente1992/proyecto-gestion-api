const paginationMiddleware = (req, res, next) => {

  const { limit = 15, page = 1 } = req.query;

  const skip = limit * (page - 1);
  req.pagination = {
    skip,
    limit: +limit
  }
  next()

}

module.exports = {
  paginationMiddleware
}