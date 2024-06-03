const express = require("express");

const router = express.Router();
const { authMiddleware } = require('../middleware');
const { createItem, getItems } = require('../controllers/level-education/level-education');
const { validatorCreateItem } = require('../validators/level-education');

router.get('/', authMiddleware, getItems);

router.post("/", validatorCreateItem, createItem);


module.exports = router;