const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const machineValidator = [
  check("userId").exists().notEmpty(),
  check("hash").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { machineValidator };
