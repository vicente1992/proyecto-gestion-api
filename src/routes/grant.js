const express = require("express");

const router = express.Router();
const { authMiddleware, paginationMiddleware } = require('../middleware');
const { uploadMiddleware } = require("../utils/handleStorage");
const { createItem, uploadFile, getItems, deleteItem, updateItem, getItem } = require('../controllers/grant/grant');
const { validatorCreateItem, validatorGetItem, validatorUpdateItem } = require('../validators/grant');

// TODO: implementar authMiddleware y control de roles

router.get('/', paginationMiddleware, getItems);

router.get("/:id", validatorGetItem, getItem);

router.post("/", validatorCreateItem, createItem);

router.post("/upload", uploadMiddleware.single('file'), uploadFile);

router.patch("/:id", validatorUpdateItem, updateItem);

router.delete('/:id', validatorGetItem, deleteItem);


module.exports = router;