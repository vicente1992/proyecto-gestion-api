const express = require("express");
const { getItem, createItem, getItems, updateItem, deleteItem, uploadMenu } = require('../controllers/tenant/tenant');
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorUpdaload } = require("../validators/tenant");
const { authMiddleware, paginationMiddleware } = require('../middleware');
const { uploadMiddleware } = require('../utils/handleStorage');
const machineMiddlewareHash = require("../middleware/machine.hash");
const router = express.Router();

router.get('/', authMiddleware, paginationMiddleware, getItems);

router.post("/", authMiddleware, validatorCreateItem, createItem);

router.get("/:id", machineMiddlewareHash, validatorGetItem, getItem);

router.patch("/:id", authMiddleware, validatorUpdateItem, updateItem);

router.patch("/upload/:id", authMiddleware, uploadMiddleware.single('file'), validatorUpdaload, uploadMenu);

router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);

module.exports = router;