const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");
const { getAllUsers,
    deleteUser,
    getAllOrders,
    updateOrderStatus,
    getAllFoods
} = require("../controllers/adminController");

router.use(authenticate, authorizeAdmin); // Protect all below routes

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);
router.get("/foods", getAllFoods);

module.exports = router;
