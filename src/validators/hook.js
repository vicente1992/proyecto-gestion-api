const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const validatorCreateHook = [
  check("name").exists().notEmpty(),
  check("tenantId").exists().notEmpty(),
  check("hookUrl").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetHook = [
  check("name").exists().notEmpty(),
  check("tenantId").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateHook, validatorGetHook };
