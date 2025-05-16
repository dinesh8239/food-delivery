const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logOut } = require('../controllers/user.controller.js');
const { authenticate } = require("../middlewares/authMiddleware.js")

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logOut', authenticate, logOut)

module.exports = router;
