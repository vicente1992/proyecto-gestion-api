const express = require("express");

const router = express.Router();
const { authMiddleware } = require('../middleware');
const { createItem, getItems, deleteItem, getMostPopular } = require('../controllers/posts/posts');
const { uploadMiddleware } = require("../utils/handleStorage");

router.post("/", authMiddleware, uploadMiddleware.array('images'), createItem);

router.get("/", getItems);
router.get("/most-popular", getMostPopular);

// router.patch("/:id", authMiddleware, validatorUpdateItem, updateItem);

// router.patch("/upload/:id", authMiddleware, uploadMiddleware.single('file'), validatorUpdaload, uploadMenu);

router.delete('/:id', authMiddleware, deleteItem);

module.exports = router;