const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['basic', 'silver', 'gold'],
    required: true
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
Plan = mongoose.model('Plan', planSchema);
module.exports = Plan
