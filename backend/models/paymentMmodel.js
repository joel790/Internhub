const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', required: true
    },
    amount: {
        type: Number,
         required: true
    },
    plan: {
        type: String,
        enum: ['free', 'silver', 'gold'],
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    transactionId: {
        type: String,
        required: true
    },
});
Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment
