const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail
} = require("../controllers/userController");

const router = express.Router();
router.post("/register", registerUser);
// router.get('/verify/:token', verifyEmail);
router.post("/login", loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);


module.exports = router;
