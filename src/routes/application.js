const express = require("express");

const router = express.Router();
const { authMiddleware, paginationMiddleware } = require('../middleware');
const { createItem, getItems, updateItem, deleteItem, generateReport } = require('../controllers/application/application');
const { validatorCreateItem, validatorUpdateItem, validatorGetItem } = require('../validators/application');

// TODO: implementar authMiddleware

router.get('/', authMiddleware, paginationMiddleware, getItems);

router.get('/report', authMiddleware, generateReport);

router.post("/", authMiddleware, validatorCreateItem, createItem);

router.patch("/:id", authMiddleware, validatorUpdateItem, updateItem);

router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);


module.exports = router;