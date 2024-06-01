const CompanyApplication = require('../models/companyApplication');
const Application = require('../models/internApplicationModel');
const Internship = require('../models/internshipModel');


// Controller for students to apply for an internship
exports.applyForInternship = async (req, res) => {
    const { coverLetter, resume, portourl } = req.body;
    const {internshipId}=req.params
    const studentId = req.user._id; // Assuming req.user contains student info

    try {
        // Check if the internship exists
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

        // Add the application to the internship's applications array
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