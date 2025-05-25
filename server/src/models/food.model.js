const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: {
      type: String,
      enum: [
        "veg", "non-veg", "cold-drink", "dessert",
        "Korean Spicy Fest", "Bk Cafe", "Snacks",
        "Whopper", "New Premium Burgers"
      ],
      required: true,
    },
    orderType: {
      type: String,
      enum: ["delivery", "dine-in/takeaway"],
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
