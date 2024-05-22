
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs")

// register users
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }
    // Check if user  already exists
    let user = await User.findOne({ email });
    if (user) {
        res.status(400);
        throw new Error("This email has already been used");
    }
    // Create new user
    user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// Login User
exports.loginUser = asyncHandler(async (req, res) => {
    // Take inputs from the user
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter an email and a password");
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("User not found ");
    }
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        res.status(401);
        throw new Error("Enter correct password");
    }
 
    if (user && isPasswordCorrect) {
        res.status(200).json( user);
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});