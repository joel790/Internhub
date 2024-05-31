const Company = require('../models/companyModel'); // Import the Company model
const User = require('../models/userModel');

exports.approveCompany = async (req, res) => {
    const { companyId } = req.params;

    try {
        // Find the company and update its status to 'approved'
        const company = await Company.findByIdAndUpdate(companyId, { status: 'approved' }, { new: true });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Update the user's role to 'company'
        const user = await User.findByIdAndUpdate(company.userId, { role: 'company' }, { new: true });

        res.status(200).json({ message: 'Company approved successfully', company, user });
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
