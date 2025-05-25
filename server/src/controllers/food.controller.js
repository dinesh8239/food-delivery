// src/controllers/food.controller.js
const Food = require("../models/food.model");
const ApiError = require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")
const asyncHandler = require("../utils/asyncHandler.js")
const Cloudinary = require("../config/cloudinary.js")


exports.createFood = asyncHandler(async (req, res) => {
  try {
    const { name, category, price, orderType } = req.body;
    console.log("Body:", req.body);

console.log("File:", req.file);
    

    const image = req.file?.path; // Cloudinary image URL

    if (!name || !category || !price || !image || !orderType) {
      throw new ApiError(400, "All fields are required including orderType");
    }

    // Ensure orderType is always an array
    // const parsedOrderType = Array.isArray(orderType) ? orderType : orderType;

    const food = await Food.create({
      name,
      price,
      category,
      image,
      orderType
    });

    return res.status(201).json(
      new ApiResponse("Food Item created successfully", food)
    );
  } catch (error) {
    throw new ApiError(500, error?.message || "Something went wrong while creating Food Item");
  }
});


// Get  Items
exports.getAllFoods = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, category, orderType } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (orderType) {
      query.orderType = orderType; // Matches items that include the given orderType
    }

    const total = await Food.countDocuments(query);
    const foods = await Food.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      currentPage: +page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      foods,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch foods" });
  }
});


  exports.getFoodById = asyncHandler(async(req, res) => {
    try {
      const { id } = req.params;
  
      const food = await Food.findById(id);
  
      if (!food) {
        return res.status(404).json({ error: "Food item not found" });
      }
  
      res.status(200).json({
        success: true,
        food,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch food item" });
    }
  });
  

exports.updateFood = asyncHandler(async (req, res) => {
    try {
        const foodId = req.params.id;
        const updates = req.body;

        if (req.file) {
            const result = await uploadOnCloudinary(req.file.path);
            updates.imageUrl = result.secure_url;
        }

        const updatedFood = await Food.findByIdAndUpdate(foodId, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedFood) {
            throw new ApiError(404, "Food not found");
        }

        return res.status(200)
            .json(
                new ApiResponse(
                    "Food updated successfully",
                    updatedFood
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "something went wrong while updated Foods")
    }
});

exports.deleteFood = asyncHandler(async (req, res) => {
    try {
        const foodId = req.params.id;

        const deleted = await Food.findByIdAndDelete(foodId);

        if (!deleted) {
            throw new ApiError(404, "Food not found");
        }

        return res.status(200)
            .json(
                new ApiResponse(
                    "Food deleted successfully",
                    deleted
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "something went wrong while deleted Foods")
    }
});


  