const CompanyApplication = require('../models/companyApplication');
const Application = require('../models/internApplicationModel');
const Internship = require('../models/internshipModel');
const User = require('../models/userModel');
const Plan = require('../models/planModel');
const Payment = require('../models/paymentMmodel');
const axios = require('axios'); // For making HTTP requests

const dotenv=require('dotenv');
dotenv.config();

// Controller for students to apply for an internship
exports.applyForInternship = async (req, res) => {
    const { coverLetter, resume, portourl } = req.body;
    const { internshipId } = req.params
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

exports.selectPlan = async (req, res) => {
    const { planId } = req.body;
    const userId = req.user._id;

    try {
        const plan = await Plan.findById(planId);
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const payment = new Payment({
            user: user._id,
            plan: plan._id,
            currency: 'ETB',
            amount: plan.price,
            status: 'pending',
            tx_ref: `tx_ref_${Date.now()}`
        });
        await payment.save();
        console.log(`Created payment: ${payment}`);
        const paymentData = {
            amount: payment.amount.toString(), // Ensure amount is a string
            currency: payment.currency,
            email: user.email,
            first_name: user.name, 
            phone_number: user.phone, 
            tx_ref: payment.tx_ref,
            callback_url: `http://localhost:5000/api/payment/callback?tx_ref=${payment.tx_ref}`, // Adjust callback URL
            return_url: "http://localhost:5173/student",
            customization: {
                title: 'Plan Payment',
                description: `Payment for ${plan.type} plan`,
            },
        };
        console.log(`Payment data to be sent to Chapa: ${JSON.stringify(paymentData)}`);
        const chapaResponse = await axios.post('https://api.chapa.co/v1/transaction/initialize', paymentData, {
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`Chapa response: ${JSON.stringify(chapaResponse.data)}`);

        if (chapaResponse.data.status !== 'success') {
            return res.status(500).json({ message: 'Payment initialization failed' });
        }

        res.status(200).json({ payment_url: chapaResponse.data.data.link });
    } catch (error) {
        console.error('Error selecting plan:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.paymentCallback = async (req, res) => {
    const { tx_ref, status, } = req.query;

    try {
        const payment = await Payment.findOne({ tx_ref }).populate('user plan');

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (status === 'success') {
            payment.status = 'completed';
            payment.transactionId = transaction_id;
            await payment.save();

            payment.user.subscriptionPlan = payment.plan._id;
            await payment.user.save();

            res.status(200).json({ message: 'Payment successful, plan updated', user: payment.user });
        } else {
            payment.status = 'failed';
            await payment.save();
            res.status(400).json({ message: 'Payment failed' });
        }
    } catch (error) {
        console.error('Error handling payment callback:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to get all internships by company
exports.getAllInternships = async (req, res) => {
    try {
        const internships = await Internship.find();
        if (!internships) {
            return res.status(404).json({ message: 'No internships found' });
        }
        res.status(200).json(internships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
