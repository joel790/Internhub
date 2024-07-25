const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    type: {
        type: String,
        // enum: ['Basic', 'Silver', 'Gold'],
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    features: {
        type: [String],
        required: true
    }
});

const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;
