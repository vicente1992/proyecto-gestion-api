const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const validatorCreateItem = [
  check("name").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorUpdateItem = [
  check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
  check("name").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetItem = [
  check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorCreateItem,
  validatorUpdateItem,
  validatorGetItem
};
