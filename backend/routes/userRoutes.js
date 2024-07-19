const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/register", userController.registerUser);
// router.get('/verify/:token', verifyEmail);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logout);
router.get("/profile", protect, userController.getUserProfile);
router.post('/forgotpassword', userController.forgotPassword);
router.put('/resetpassword/:resetToken', userController.resetPassword);


module.exports = router;
