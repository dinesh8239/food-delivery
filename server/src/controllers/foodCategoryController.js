const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');
const foodCategories = require('../models/foodCategoryModel');

exports.getAllFoodCategories = asyncHandler(async (req, res) => {
    try {
        const { orderType } = req.query;

        let filteredCategories = foodCategories;

        if (orderType) {
            filteredCategories = foodCategories.filter(cat => cat.orderType === orderType);
        }

        res.status(200).json(
            new ApiResponse(
                "Food Categories fetched successfully",
                filteredCategories
            )
        );
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while fetching food categories");
    }
});

