const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const validatorCreateItem = [
  check("documentNumber").exists().notEmpty(),
  check("document").exists().notEmpty(),
  check("grantId").exists().notEmpty(),
  check("userId").optional(),
  check("status").optional(),
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


const validatorUpdateItem = [
  check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
  check("documentNumber").exists().notEmpty(),
  check("document").exists().notEmpty(),
  check("grantId").optional(),
  check("userId").optional(),
  check("status").optional(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem };
