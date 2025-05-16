// controllers/orderController.js
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Food = require("../models/food.model.js");
const User = require("../models/userModel.js")
const ApiError = require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")
const asyncHandler = require("../utils/asyncHandler.js")
const sendEmail = require("../utils/sendEmail.js");


exports.placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { deliveryAddress, paymentMethod } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.food");

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty")
    }

    const orderItems = cart.items.map((item) => ({
      food: item.food._id,
      quantity: item.quantity,
      priceAtOrder: item.food.price,
    }));

    const order = new Order({
      user: userId,
      items: orderItems,
      totalPrice: cart.totalPrice,
      deliveryAddress,
      paymentMethod,
    });

    await order.save();

    // Clear cart
    await Cart.findOneAndDelete({ user: userId });

    // Fetch user from DB
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    await sendEmail(
      user.email || "radhikadharma0408@gmail.com",
      "Order Confirmation",
      `<h2>Hi ${user.name},</h2><p>Your order has been placed successfully. Order ID: <b>${order._id}</b></p>`
    );

    return res.status(201).json(
      new ApiResponse(
        "Order placed successfully",
        order
      )
    );

  } catch (error) {
    throw new ApiError(500, error?.message || "Failed to place order");
  }
});


exports.getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate("items.food");
    return res.status(200)
      .json(
        new ApiResponse(
          "Order fetched successfully",
          orders
        )
      )
  } catch (error) {
    throw new ApiError(500, error?.message || "Failed to fetch order")
  }
});

exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.food").sort({ createdAt: -1 });
    return res.status(200)
      .json(
        new ApiResponse(
          "Order fetched successfully",
          orders
        )
      )
  } catch (error) {
    throw new ApiError(500, error?.message || "Failed to fetch all Order")
  }
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    await order.save();

    return res.status(201)
      .json(
        new ApiResponse(
          "Order status updated successfully",
          order
        )
      )
  } catch (error) {
    throw new ApiError(500, error?.message || "Failed to uosate order status")
  }
});

exports.cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found")
    }
    if (!order.user.equals(userId)) {
      throw new ApiError(403, "Unauthorized")
    }

    if (["delivered", "cancelled"].includes(order.status)) {
      return res.status(400).json({ error: `Cannot cancel ${order.status} order` });
    }

    order.status = "cancelled";
    await order.save();

    // Simulate Refund
    let refundStatus = "not_required";
    if (["card", "upi"].includes(order.paymentMethod)) {
      // Simulate refund logic
      refundStatus = "initiated"; // Replace with real payment API call
    }

    await sendEmail(
      user.email || "radhikadharma0408@gmail.com",
      "Order Cancelled",
      `<h2>Hi ${user.name},</h2><p>Your order <b>${order._id}</b> has been canceled. If you paid, refund will be initiated soon.</p>`
    );

    return res.status(201)
      .json(
        new ApiResponse(
          "Order Cancel successfully",
          order
        )
      )
  } catch (error) {
    throw new ApiError(500, error?.message || "Failed to Cancel order")
  }
});
