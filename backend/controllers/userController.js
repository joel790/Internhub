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
    const { name, email, password } = req.body;

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
        });

        await user.save();

        // Generate JWT token
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: "none"
        });
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Email Verification
// exports.verifyEmail = async (req, res) => {
//     const { token } = req.params;

//     try {
//         // Find the token
//         const verificationToken = await Token.findOne({ token });
//         if (!verificationToken) {
//             return res.status(400).json({ message: 'Invalid or expired token' });
//         }
//         // Find the user
//         const user = await User.findById(verificationToken.user);
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         // Verify the user
//         user.isVerified = true;
//         await user.save();

//         // Remove the token
//         await Token.deleteOne({ _id: verificationToken._id });

//         // Generate JWT
//         const jwtToken = generateToken(user._id);

//         // Set JWT in cookie
//         res.cookie('token', jwtToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'development'
//         });

//         res.status(200).json({ message: 'Email verified successfully', token: jwtToken });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


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
    // if (!user.isVerified) {
    //     res.status(401);
    //     throw new Error("Please verify your email before logging in");
    // }

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

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash the token and set it to the resetPasswordToken field
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        // Set token expiration time (e.g., 1 hour)
        user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.BASE_URL}/api/users/passwordreset/${resetToken}`;

        // Email message
        const message = `
            Password Reset
            You requested a password reset. Please click on the following link to reset your password:</p>
            ${resetUrl}`;

        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            text: message,
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    try {
        // Hash the token
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Find user by token and check if token is not expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Set new password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    const userId = req.user._id; // Get user ID from the authenticated user

    try {
        const user = await User.findById(userId).select('-password'); // Exclude password and version from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};