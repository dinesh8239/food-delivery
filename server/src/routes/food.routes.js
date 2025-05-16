// src/routes/food.routes.js
const express = require("express");
const router = express.Router();
const { createFood, getAllFoods, updateFood, deleteFood, getFoodById } = require("../controllers/food.controller");
const upload = require("../middlewares/multer.js");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");



router.post("/",
    authenticate,
    authorizeAdmin, 
    upload.single("image"), 
    createFood);  // Add food (admin-side)

router.get("/", getAllFoods); 

router.get("/:id", getFoodById);


router.put(
    "/:id",
    authenticate,
    authorizeAdmin,
    upload.single("image"),
    updateFood
  );

  router.delete(
    "/:id",
    authenticate,
    authorizeAdmin,
    deleteFood
  );

module.exports = router;
