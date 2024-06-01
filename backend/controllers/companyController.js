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


// Approve Application
exports.approveApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await internApplication.findByIdAndUpdate(
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
        const application = await internApplication.findByIdAndUpdate(
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
