const express = require("express");

const router = express.Router();
const { authMiddleware } = require('../middleware');
const { createItem } = require('../controllers/comments/comment');

// router.get('/', authMiddleware, paginationMiddleware, getItems);

router.post("/", createItem);

// router.get("/:id", machineMiddlewareHash, validatorGetItem, getItem);

// router.patch("/:id", authMiddleware, validatorUpdateItem, updateItem);

// router.patch("/upload/:id", authMiddleware, uploadMiddleware.single('file'), validatorUpdaload, uploadMenu);

// router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);

module.exports = router;