const CompanyApplication = require('../models/companyApplication');
const Application = require('../models/internApplicationModel');
const Internship = require('../models/internshipModel');

// Apply for Internship
exports.applyInternship = async (req, res) => {
    const { coverLetter, resume, portourl } = req.body;
    const { internshipId } = req.params;
    const studentId = req.user.id; // Assuming req.user contains student info

    try {
        // Check if internship exists
        const internship = await Internship.findById(internshipId);
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        // Check if student has already applied
        const existingApplication = await Application.findOne({
            internship: internshipId,
            student: studentId
        });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this internship' });
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

        // Add application to internship's applications array
        internship.applications.push(savedApplication._id);
        await internship.save();

        res.status(201).json(savedApplication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.applyToCompany = async (req, res) => {
    const { name, slogan, description, industry, location, managerName, jobTitle, contactNumber, website, license, logo, subscriptionPlan } = req.body;
    const userId = req.user.id; // Assuming req.user contains user info

    try {
        const application = new CompanyApplication({
            user: userId,
            name,
            slogan,
            description,
            industry,
            location,
            managerName,
            jobTitle,
            contactNumber,
            website,
            license,
            logo,
            subscriptionPlan
        });

        const savedApplication = await application.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};