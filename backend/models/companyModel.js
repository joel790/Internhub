const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique:true
    },
    slogan: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    contactNumber: [{
        type: String,
        required: true,
        unique:true
    }],
    website: {
        type: String
    },
    license: {
        type: String,
        required: true,
        unique:true
    },
    intenships:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Internship",
    },
    logo: {
        type: String,
        required: true
    },
    subscriptionPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

Company = mongoose.model('Company', CompanySchema);

module.exports = Company