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
<<<<<<< HEAD
        "Whopper", "New Premium Burgers"
=======
        "Whopper", "New Premium Burgers", "Value Meals", "Best of Combos"
>>>>>>> 52ed44e3 (feat: Add food category management functionality)
      ],
      required: true,
    },
    orderType: {
<<<<<<< HEAD
      type: String,
      enum: ["delivery", "dine-in/takeaway"],
=======
      type: [String],
      enum: ["delivery", "dine-in/takeaway"],
      default: ["delivery", "dine-in/takeaway"],
>>>>>>> 52ed44e3 (feat: Add food category management functionality)
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
