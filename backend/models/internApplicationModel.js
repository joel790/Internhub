const mongoose = require('mongoose');


const ApplicationSchema = new mongoose.Schema({
    internship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Internship', required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    coverLetter: {
        type: String, required: true
    },
    resume: {
        type: String,
        required: true
    },
    portourl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
});
Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application
