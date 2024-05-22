const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'hiringManager'],
    default: 'student', // Default role is student
    required: true,
  },
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  phone: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
);

userSchema.pre("save", async function (next) {
    try {
      if (!this.isModified("password")) {
        return next();
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      return next();
    } catch (error) {
      return next(error);
    }
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;
