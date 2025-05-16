const express = require("express");
const router = express.Router();
const {addToCart,getCart, removeFromCart } = require("../controllers/cart.controller.js");
const { authenticate } = require("../middlewares/authMiddleware.js");

// router.use(authenticate);

router.post("/add", authenticate, addToCart); // Add item
router.get("/", authenticate, getCart);        // Get cart
router.delete("/remove/:foodId", authenticate, removeFromCart); // Remove item

module.exports = router;
