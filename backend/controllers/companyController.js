const Internship = require('../models/internshipModel');
const Application = require("../models/internApplicationModel");
const User = require('../models/userModel');
const  mongoose  = require('mongoose');
// Controller to create an internship
exports.createInternship = async (req, res) => {
    const { title, location, type, payment, duration, industry, description, requirements, skills, deadline, benefit, responsibilities } = req.body;
    const companyId = req.user._id; // Assuming req.user contains company info

    try {
        const internship = new Internship({
            company: companyId, // Associate the internship with the company using companyId
            title,
            location,
            industry,
            type,
            payment,
            duration,
            description,
            requirements,
            skills,
            deadline,
            benefit,
            responsibilities
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
    // const { title, description, duration, featured, location, skills, payment, type } = req.body;

    try {
        const internship = await Internship.findByIdAndUpdate(internshipId, req.body, { new: true });

        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        // internship.title = title || internship.title;
        // internship.type = type || internship.type;
        // internship.payment = payment || internship.payment;
        // internship.description = description || internship.description;
        // internship.duration = duration || internship.duration;
        // internship.location = location || internship.location;
        // internship.skills = skills || internship.skills;
        // internship.featured = featured || internship.featured;

        const updatedInternship = await internship.save();
        res.status(200).json(updatedInternship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteInternship = async (req, res) => {
    const { internshipId } = req.params;
    // const companyId = req.user._id; // Assuming req.user contains company info

    try {
        const internship = await Internship.findByIdAndDelete(internshipId);

        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        res.status(200).json({ message: 'Internship deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
//this is used for students inorder to get all internships for a company
exports.getAllInternshipsOfCompany = async (req, res) => {
    const { companyId } = req.params;

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

// //get all internships
// exports.getAllInternships = async (req, res) => {

//     try {
//         const internships = await Internship.find();

//         if (!internships.length) {
//             return res.status(404).json({ message: 'No internships found' });
//         }

//         res.status(200).json(internships);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

    exports.updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;
    const companyId = req.user._id; // Assuming req.user contains company info
    try {
        // Check if the application exists and belongs to an internship of the company
        const application = await Application.findById(applicationId).populate('internship');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // if (application.internship.company.toString() !== companyId.toString()) {
        //     return res.status(403).json({ message: 'Access denied' });
        // }
        // Update the application status
        application.status = status;
        const updatedApplication = await application.save();

        res.status(200).json(updatedApplication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getApplicationsForInternship = async (req, res) => {
    const { internshipId } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(internshipId)) {
        return res.status(400).json({ message: 'Invalid internship ID format' });
    }

    try {
        // Check if the internship exists
        const internship = await Internship.findById(internshipId);
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        // Fetch applications associated with this internship
        const applications = await Application.find({ internship: internshipId });
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

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
//inorder to get all internships applications by id
exports.getapplicationsforInternshipByappid=async(req,res)=>{
    const {id}=req.params
    try{
          const application=await Application.findById(id);
    if(!application){
        return res.status(404).json({ message: 'application not found' });
    }
    res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
  

    }
//inorder to get all students apply for all internships posted by company
    exports.getStudentbyId=async(req,res)=>{
        const {id}=req.params
        try{
            const student=await User.findById(id);
            if(!student){
                return res.status(404).json({ message: 'user not found' });

            }
            res.status(200).json(student);


        }catch(error){
            res.status(500).json({ message: 'Server error' });

        }

    }





exports.featuredInternships = async (req, res) => {
    try {
        const featuredinternships = await Internship.find({ featured: true });
        if (!featuredinternships) {
            return res.status(404).json("no featured internships")
        }
        res.status(200).json(featuredinternships)
    } catch (error) {
        res.status(500).json(error)

    }
};
