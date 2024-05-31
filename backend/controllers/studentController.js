const Application = require('../models/applicationModel');
const Internship = require('../models/internshipModel');
const User = require('../models/userModel');
const express=require("express")
// Apply for Internship
exports.applyInternship = async (req, res) => {
    const { internshipId, coverLetter, resume, portourl } = req.body;
    const studentId = req.user.id; // Assuming req.user contains student info

    try {
        // Check if internship exists
        const internship = await Internship.findById(internshipId);
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        // Create a new application
        const application = new Application({
            internship: internshipId,
            student: studentId,
            coverLetter,
            resume,
            portourl
        });

        const savedApplication = await application.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

