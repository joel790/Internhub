const mongoose = require('mongoose');

const CompanyApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    slogan: { type: String },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    managerName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    contactNumber: [String],
    website: { type: String },
    license: { type: String, required: true },
    logo: { type: String, required: true },
    subscriptionPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const CompanyApplication = mongoose.model('CompanyApplication', CompanyApplicationSchema);
module.exports = CompanyApplication;
