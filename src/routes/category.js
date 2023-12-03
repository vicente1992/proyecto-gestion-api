const express = require("express");

const router = express.Router();
const { authMiddleware } = require('../middleware');
const { deleteItem, createItem, getItems, getRatingByCategory } = require("../controllers/category/category");

router.post("/", createItem);

router.get("/", getItems);

router.get("/ratings/:id", getRatingByCategory);


router.delete('/:id', authMiddleware, deleteItem);

module.exports = router;