const express = require("express");

const router = express.Router();
const { authMiddleware } = require('../middleware');
const { createItem, getItems, updateItem, deleteItem } = require('../controllers/level-education/level-education');
const { validatorCreateItem, validatorUpdateItem, validatorGetItem } = require('../validators/level-education');

// TODO: implementar authMiddleware

router.get('/', getItems);

router.post("/", validatorCreateItem, createItem);

router.patch("/:id", validatorUpdateItem, updateItem);

router.delete('/:id', validatorGetItem, deleteItem);


module.exports = router;