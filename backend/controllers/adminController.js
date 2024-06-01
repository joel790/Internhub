const CompanyApplication = require('../models/companyApplication');
const User = require('../models/userModel');

// Controller to approve a company application
exports.approveCompanyApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await CompanyApplication.findById(applicationId).populate('user');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.status !== 'pending') {
            return res.status(400).json({ message: 'Application has already been processed' });
        }

        // Update user role and company details
        const user = application.user;
        user.role = 'company';
        user.companyDetails = {
            name: application.name,
            slogan: application.slogan,
            description: application.description,
            industry: application.industry,
            location: application.location,
            managerName: application.managerName,
            jobTitle: application.jobTitle,
            contactNumber: application.contactNumber,
            website: application.website,
            license: application.license,
            logo: application.logo,
            subscriptionPlan: application.subscriptionPlan
        };

        await user.save();

        // Update application status
        application.status = 'approved';
        await application.save();

        res.status(200).json({ message: 'Company application approved', application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to reject a company application
exports.rejectCompanyApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await CompanyApplication.findById(applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.status !== 'pending') {
            return res.status(400).json({ message: 'Application has already been processed' });
        }

        // Update application status
        application.status = 'rejected';
        await application.save();

        res.status(200).json({ message: 'Company application rejected', application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




// Controller to filter companies by status
exports.filterCompaniesByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        // Validate status
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find companies with the specified status
        const companies = await Company.find({ status });

        // Return the filtered companies
        res.status(200).json({ companies });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        // Retrieve all companies from the database
        const companies = await Company.find();
        
        // Check if there are no companies
        if (companies.length === 0) {
            return res.status(404).json({ message: 'No companies found' });
        }

        // Return the retrieved companies as a response
        res.status(200).json({ companies });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller to get a company by its ID
exports.getCompanyById = async (req, res) => {
    const { companyId } = req.params;

    try {
        // Find the company by its ID
        const company = await Company.findById(companyId).populate('userId', 'name email');

        // Check if the company exists
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Return the company information
        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
