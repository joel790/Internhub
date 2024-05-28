const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
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
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    license: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    subscriptionPlan: {
        type: String,
        enum: ['free', 'silver', 'gold'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

Company = mongoose.model('Company', CompanySchema);

module.exports = Company