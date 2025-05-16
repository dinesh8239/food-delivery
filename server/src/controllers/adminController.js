const User = require("../models/userModel.js")
const Order = require("../models/orderModel.js")
const Food = require("../models/food.model.js")

exports.getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  };
  
  exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  };
  
  exports.getAllOrders = async (req, res) => {
    const orders = await Order.find().populate("user", "name email");
    res.json({ success: true, orders });
  };

  exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
  
    order.status = status;
    await order.save();
    res.json({ success: true, message: "Order status updated", order });
  };
  
  exports.getAllFoods = async (req, res) => {
    const foods = await Food.find();
    res.json({ success: true, foods });
  };
  