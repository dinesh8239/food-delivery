const Cart = require("../models/cartModel");
const Food = require("../models/food.model");
const User = require("../models/userModel.js")
const ApiError = require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")
const asyncHandler = require("../utils/asyncHandler.js")


exports.addToCart = asyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;
      if (!userId) {
        throw new ApiError(400, "User not found");
      }
      const { foodId, quantity } = req.body;
  
      const food = await Food.findById(foodId);
      if (!food) {
        throw new ApiError(404, "Food not found");
      }
  
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        cart = new Cart({
          user: userId,
          items: [{ food: foodId, quantity }],
          totalPrice: food.price * quantity,
        });
      } else {
        const itemIndex = cart.items.findIndex(
          (item) => item.food.toString() === foodId
        );
  
        if (itemIndex > -1) {
          // Set new quantity instead of adding
          cart.items[itemIndex].quantity = quantity;
        } else {
          // New item
          cart.items.push({ food: foodId, quantity });
        }
  
        // Recalculate total
        cart.totalPrice = 0;
        for (const item of cart.items) {
          const foodItem = await Food.findById(item.food);
          cart.totalPrice += foodItem.price * item.quantity;
        }
      }
  
      await cart.save();
      return res.status(201).json(
        new ApiResponse("Food added to cart successfully", cart)
      );
    } catch (error) {
      throw new ApiError(500, error?.message || "Something went wrong while adding to cart");
    }
  });
  

exports.getCart = asyncHandler(async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.food");

        if (!cart) return res.status(200).json({ cart: { items: [], totalPrice: 0 } });

        return res.status(200)
            .json(
                new ApiResponse(
                    "addTo Cart fetched successfully",
                    cart
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while fetched getCart")
    }
});

exports.removeFromCart = asyncHandler(async (req, res) => {
    const { foodId } = req.params;

    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            throw new ApiError(404, "cart not found")
        }

        cart.items = cart.items.filter((item) => item.food.toString() !== foodId);

        // Recalculate total
        cart.totalPrice = 0;
        for (const item of cart.items) {
            const foodItem = await Food.findById(item.food);
            cart.totalPrice += foodItem.price * item.quantity;
        }

        await cart.save();

        return res.status(201)
            .json(
                new ApiResponse(
                    "remove From Cart  successfully",
                    cart
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while removeFromCart")
    }
});
