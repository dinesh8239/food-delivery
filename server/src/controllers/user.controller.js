const User = require('../models/userModel.js');
const authenticate = require('../middlewares/authMiddleware.js')
const asyncHandler = require('../utils/asyncHandler.js')
const ApiError = require('../utils/ApiError.js')
const ApiResponse = require('../utils/ApiResponse.js')
const bcrypt = require('bcrypt');
const {validateSchemaUpdatae} = require("../utils/validation.js")


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        // console.log('Access Token Secret:', process.env.ACCESS_TOKEN_SECRET);
        // console.log('Refresh Token Secret:', process.env.REFRESH_TOKEN_SECRET);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token: " + error.message);
    }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request: Refresh token is missing.");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token: User not found.");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Invalid refresh token: Token expired or used.");
        }

        const options = {
            httpOnly: true,
            server: true
        };

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully."));
    } catch (error) {
        throw new ApiError(401, error?.message || "Something went wrong while refreshing access token.");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    try {
        validateSchemaUpdatae(req);

        const { name, email, password, role } = req.body;

        // if (!name || !email || !password) {
        //     throw new ApiError(400, "please provide all the required fields")
        // }

        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new ApiError(400, "User already exists with this email")
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken").lean();

        if (!createdUser) {
            throw new ApiError(500, "User not created.");
        }

        return res.status(201)
            .json(
                new ApiResponse(
                    201,
                    "User created successfully",
                    createdUser
                )
            )

    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while registering user")
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid credentials");
        }
        //  Admin role logic based on email
        if (user.email === "dkkumar97855@gmail.com" && user.role !== "admin") {
            user.role = "admin";
            await user.save(); // Save the role update
        }


        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const loggedInUser = await User.findById(user._id)
            .select("-password -refreshToken")
            .lean();

        return res.status(200).json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while logging in user");
    }
});

const logOut = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Clear refresh token from DB
        user.refreshToken = undefined;
        await user.save({ validateBeforeSave: false });

        // Clear cookies
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json(
            new ApiResponse(200, "User logged out successfully", user)
        );
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while logging out");
    }
});


module.exports = {
    refreshAccessToken,
    generateAccessAndRefreshTokens,
    registerUser,
    loginUser,
    logOut
};
