const { check } = require('express-validator');
const validateResults = require('../utils/handleValidation');

const validatorUpdateItem = [
  check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
  check("status")
    .notEmpty(),
  check("containerId")
    .optional(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
];


module.exports = {
  validatorUpdateItem
}