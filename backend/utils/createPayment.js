const axios = require('axios');

const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';
const CHAPA_API_KEY = process.env.CHAPA_SECRET_KEY; // Replace this with your actual Chapa API key

exports.createPayment = async (paymentData) => {
    try {
        const response = await axios.post(CHAPA_API_URL, paymentData, {
            headers: {
                'Authorization': `Bearer ${CHAPA_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error.response ? error.response.data : error.message);
        throw error;
    }
};

