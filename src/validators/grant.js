/**
 * title
levelEducation
dateEnd
initialDate
logo
requirements
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const validatorCreateItem = [
  check("title").exists().notEmpty(),
  check("levelEducation").exists().notEmpty(),
  check("dateEnd").exists().notEmpty(),
  check("initialDate").exists().notEmpty(),
  check("logo").exists().notEmpty(),
  check("requirements").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateItem };
