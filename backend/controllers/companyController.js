const Internship = require('../models/internshipModel');
const internApplication = require('../models/internApplicationModel');



// Controller to create an internship
exports.createInternship = async (req, res) => {
    const { title, description, duration, location, skills } = req.body;
    const companyId = req.user._id; // Assuming req.user contains company info

    try {
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

exports.updateInternship = async (req, res) => {
    const { internshipId } = req.params;
    const { title, description, duration, location, skills } = req.body;
    const companyId = req.user._id; // Assuming req.user contains company info

    try {
        const internship = await Internship.findOne({ _id: internshipId, company: companyId });

        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        internship.title = title || internship.title;
        internship.description = description || internship.description;
        internship.duration = duration || internship.duration;
        internship.location = location || internship.location;
        internship.skills = skills || internship.skills;

        const updatedInternship = await internship.save();
        res.status(200).json(updatedInternship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteInternship = async (req, res) => {
    const { internshipId } = req.params;
    const companyId = req.user._id; // Assuming req.user contains company info

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

// Controller to get all internships by company
exports.getAllInternshipsByCompany = async (req, res) => {
    const companyId = req.user._id; // Assuming req.user contains company info

    try {
        const internships = await Internship.find({ company: companyId });

        if (!internships.length) {
            return res.status(404).json({ message: 'No internships found' });
        }

        res.status(200).json(internships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
//get all internships
exports.getAllInternships = async (req, res) => {

    try {
        const internships = await Internship.find();

        if (!internships.length) {
            return res.status(404).json({ message: 'No internships found' });
        }

        res.status(200).json(internships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


 exports.updateApplicationStatus = async (req, res) => {
    const { applicationId,status } = req.params;
    const companyId = req.user._id; // Assuming req.user contains company info
    try {
        // Check if the application exists and belongs to an internship of the company
        const application = await internApplication.findById(applicationId).populate('internship');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.internship.company.toString() !== companyId.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Update the application status
        application.status = status;
        const updatedApplication = await application.save();

        res.status(200).json(updatedApplication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Controller for companies to get applications for a specific internship
exports.getApplicationsForInternship = async (req, res) => {
    const { internshipId } = req.params;
    const companyId = req.user._id; // Assuming req.user contains company info

    try {
        // Check if the internship exists and belongs to the company
        const internship = await Internship.findOne({ _id: internshipId, company: companyId }).populate('applications');
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found or access denied' });
        }

        res.status(200).json(internship.applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to get all internships by company
exports.getInternshipsById = async (req, res) => {
    const { id } = req.params; // Assuming req.user contains company info


    try {
        const internship = await Internship.findById(id);

        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        res.status(200).json(internship);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller: internshipController.js

exports.getFeaturedInternships = async (req, res) => {
    try {
        const featuredInternships = await Internship.find({ featured: true });
        if (!featuredInternships) {
            return res.status(404).json({ message: 'No featured internships found' });
        }
        res.status(200).json(featuredInternships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};