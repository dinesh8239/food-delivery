const express = require("express");
const router = express.Router();
const {placeOrder, getMyOrders, getAllOrders, updateOrderStatus, cancelOrder} = require("../controllers/order.controller.js");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware.js");

router.use(authenticate);

// User
router.post("/place", placeOrder);
router.get("/my", getMyOrders);

// Admin
router.get("/admin/all", authorizeAdmin, getAllOrders);
router.put("/admin/status/:orderId", authorizeAdmin, updateOrderStatus);
router.put("/cancel/:orderId", cancelOrder);


module.exports = router;
