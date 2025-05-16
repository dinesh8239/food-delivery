const mongoose = require("mongoose");
const { Schema } = require("mongoose")

const orderItemSchema = new Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  priceAtOrder: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },

    refundStatus: {
      type: String,
      enum: ["not_required", "initiated", "processed", "failed"],
      default: "not_required",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
