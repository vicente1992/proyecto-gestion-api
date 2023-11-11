const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation")

const validatorCreateItem = [
    check("manager")
        .exists()
        .notEmpty(),
    check("email")
        .exists()
        .notEmpty(),
    check("company")
        .exists()
        .notEmpty(),
    check("delivery")
        .exists()
        .notEmpty(),
    check("website")
        .exists()
        .notEmpty(),
    check("meals")
        .exists()
        .notEmpty(),
    check("drinks")
        .exists()
        .notEmpty(),
    check("botName")
        .exists()
        .notEmpty(),
    check("schedule")
        .exists()
        .notEmpty(),
    check("location")
        .exists()
        .notEmpty(),
    check("openAiKey")
        .optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


const validatorGetItem = [
    check("id")
        .exists()
        .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItem = [
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    check("manager")
        .exists()
        .notEmpty(),
    check("email")
        .exists()
        .notEmpty(),
    check("company")
        .exists()
        .notEmpty(),
    check("delivery")
        .exists()
        .notEmpty(),
    check("website")
        .exists()
        .notEmpty(),
    check("meals")
        .exists()
        .notEmpty(),
    check("drinks")
        .exists()
        .notEmpty(),
    check("botName")
        .exists()
        .notEmpty(),
    check("schedule")
        .exists()
        .notEmpty(),
    check("location")
        .exists()
        .notEmpty(),
    check("enable")
        .optional(),
    check("status")
        .optional(),
    check("openAiKey")
        .optional(),
    check("containerId")
        .optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];
const validatorUpdaload = [
    check('id')
        .exists()
        .notEmpty()
        .isMongoId(),
    check('file')
        .custom((value, { req }) => {
            if (req.file) {
                return true;
            }
        })
        .withMessage('FILE_EMPTY'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];



module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorUpdaload };