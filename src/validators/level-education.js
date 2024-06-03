const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const validatorCreateItem = [
  check("name").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateItem };
