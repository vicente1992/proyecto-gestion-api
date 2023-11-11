const { check } = require('express-validator');
const validateResults = require('../utils/handleValidation');

const loginValidator = [
  check('email').exists().notEmpty(),
  check('password').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { loginValidator };
