const Company = require('../models/companyModel');

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

