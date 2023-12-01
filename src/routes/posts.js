const express = require("express");

const router = express.Router();
const { authMiddleware } = require('../middleware');
const { createItem, getItems } = require('../controllers/posts/posts');
const { uploadMiddleware } = require("../utils/handleStorage");

// router.get('/', authMiddleware, paginationMiddleware, getItems);

router.post("/", authMiddleware, uploadMiddleware.array('images'), createItem);

router.get("/", getItems);

// router.patch("/:id", authMiddleware, validatorUpdateItem, updateItem);

// router.patch("/upload/:id", authMiddleware, uploadMiddleware.single('file'), validatorUpdaload, uploadMenu);

// router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);

module.exports = router;