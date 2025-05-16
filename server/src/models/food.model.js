const mongoose = require("mongoose");
const {Schema} = require("mongoose")

const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    // description:{type: String },
    category: {
      type: String,
      enum: ["veg", "non-veg", "cold-drink", "dessert", "Korean Spicy Fest", "Bk Cafe", "Snacks", "Whopper", "New Premium Burgers"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
