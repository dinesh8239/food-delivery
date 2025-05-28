const express = require('express');
const router = express.Router();
const { getAllFoodCategories } = require('../controllers/foodCategoryController');
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");


router.get('/', getAllFoodCategories);

module.exports = router;
