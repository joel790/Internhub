const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")

const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendMail');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password, } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        user = new User({
            name,
            email,
            password,
            isVerified: false
        });

        await user.save();

        // Generate a verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const token = new Token({
            user: user._id,
            token: verificationToken
        });

        await token.save();

        // Send verification email
        const verificationUrl = `${process.env.BASE_URL}/api/users/verify/${verificationToken}`;
        const message = `Email Verification
      Please verify your email by clicking the link below:
      ${verificationUrl}`;

        await sendEmail({
            to: user.email,
            subject: 'Email Verification',
            text: message
        });

        res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Email Verification
exports.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        // Find the token
        const verificationToken = await Token.findOne({ token });
        if (!verificationToken) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        // Find the user
        const user = await User.findById(verificationToken.user);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verify the user
        user.isVerified = true;
        await user.save();

        // Remove the token
        await Token.deleteOne({ _id: verificationToken._id });

        // Generate JWT
        const jwtToken = generateToken(user._id);

        // Set JWT in cookie
        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development'
        });

        res.status(200).json({ message: 'Email verified successfully', token: jwtToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login User
exports.loginUser = asyncHandler(async (req, res) => {
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
        throw new Error("User not found");
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
        res.status(401);
        throw new Error("Please verify your email before logging in");
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        res.status(401);
        throw new Error("Incorrect password");
    }

    if (user && isPasswordCorrect) {
        // Generate JWT token
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
        });
        res.status(200).json({ user, token });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});