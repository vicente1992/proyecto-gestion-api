const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const validatorCreateItem = [
  check("title").exists().notEmpty(),
  check("levelEducation").exists().notEmpty(),
  check("dateEnd").exists().notEmpty(),
  check("initialDate").exists().notEmpty(),
  check("logo").exists().notEmpty(),
  check("requirements").exists().notEmpty(),
  check("isActive").optional(),
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
  check("title").exists().notEmpty(),
  check("levelEducation").exists().notEmpty(),
  check("dateEnd").exists().notEmpty(),
  check("initialDate").exists().notEmpty(),
  check("logo").exists().notEmpty(),
  check("requirements").exists().notEmpty(),
  check("isActive").optional(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem };
