const express = require("express");

const router = express.Router();
const { seedCategories } = require("../controllers/seed/seeders");

router.get('/', seedCategories);


module.exports = router;