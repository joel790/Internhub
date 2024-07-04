const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    benefit: {
        type: String,
        required: true
    },
    responsibilities: [{
        type: String,
        required: true
    }],
    requirements: [{
        type: String,
        required: true
    }],
    location: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    skills: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        enum: ['remote', 'part time', 'full time'],
        required: true
    },
    payment: {
        type: String,
        enum: ['free', 'paid'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ],
});
Internship = mongoose.model('Internship', InternshipSchema);

module.exports = Internship
