const Company = require('../models/companyModel');
const Internship = require('../models/internshipModel');
const Application = require('../models/applicationModel');
const User = require('../models/userModel');

// Store company application details
exports.applyToCompany = async (req, res) => {
    const { name, slogan, description, industry, location, managerName, jobTitle, email, contactNumber, website, license, logo, subscriptionPlan } = req.body;
    const userId = req.user.id; // Assuming user ID is available in request after authentication

    try {
        // Create new company instance
        const newCompany = new Company({
            userId,
            name,
            slogan,
            description,
            industry,
            location,
            managerName,
            jobTitle,
            email,
            contactNumber,
            website,
            license,
            logo,
            subscriptionPlan
        });

        // Save the company to the database
        await newCompany.save();

        res.status(201).json({ message: 'Company application submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to create an internship
exports.createInternship = async (req, res) => {
    const { title, description, duration, location, skills } = req.body;
    const companyId = req.user._id; // Assuming the logged-in user is the company

    try {
        const company = await User.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const internship = new Internship({
            company: companyId,
            title,
            description,
            duration,
            location,
            skills
        });

        const savedInternship = await internship.save();
        res.status(201).json(savedInternship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Controller to update an internship
exports.updateInternship = async (req, res) => {
    const { internshipId } = req.params;
    const { title, description, duration, location, skills } = req.body;
    const companyId = req.user.company; // Assuming req.user contains company info

    try {
        const internship = await Internship.findOneAndUpdate(
            { _id: internshipId, company: companyId },
            { title, description, duration, location, skills },
            { new: true }
        );

        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        res.status(200).json(internship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Controller to delete an internship
exports.deleteInternship = async (req, res) => {
    const { internshipId } = req.params;
    const companyId = req.user.company; // Assuming req.user contains company info

    try {
        const internship = await Internship.findOneAndDelete({ _id: internshipId, company: companyId });

        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        res.status(200).json({ message: 'Internship deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to get all internships for a company
exports.getAllInternshipsBycompany = async (req, res) => {
    const companyId = req.user.company; // Assuming req.user contains company info

    try {
        const internships = await Internship.find({ company: companyId });

        res.status(200).json(internships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Approve Application
exports.approveApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await Application.findByIdAndUpdate(
            applicationId,
            { status: 'accepted' },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application approved successfully', application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reject Application
exports.rejectApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await Application.findByIdAndUpdate(
            applicationId,
            { status: 'rejected' },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application rejected successfully', application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
