const Company = require('../models/companyModel'); // Import the Company model
const User = require('../models/userModel');

exports.approveCompany = async (req, res) => {
    const { companyId } = req.params;
    console.log(req.user);
    const userId = req.user.id;
   

    try {
        // Update the user role to "company"
        await User.findByIdAndUpdate(
            userId,
            { role: 'company' }
        );

        // Find the company by ID and update its status to "approved"
        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            { status: 'approved' },
            { new: true }
        );

        // Check if the company exists and its status has been updated
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Return a success message indicating that the company has been approved
        res.status(200).json({ message: 'Company approved successfully', company: updatedCompany });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

