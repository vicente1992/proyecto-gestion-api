const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const registerValidator = [
  check('name').exists().notEmpty(),
  check('email').exists().notEmpty(),
  check('password').exists().notEmpty(),
  check('role').optional(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { registerValidator };
