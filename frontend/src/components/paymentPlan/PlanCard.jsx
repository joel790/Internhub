import React from 'react';
import { PiPerson } from 'react-icons/pi';
import axios from 'axios';

const PlanCard = ({ planName, price, features, planId }) => {
    const handleSubscribe = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/student/selectplan', { planId });
            const paymentUrl = response.data.payment_url;
            console.log(paymentUrl);
            if (paymentUrl) {
                window.location.href = paymentUrl;
            } else {
                console.error('Payment URL not found');
            }
        } catch (error) {
            console.error('Error subscribing to plan:', error.response ? error.response.data : error.message);
           
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden border border-blue-200 w-[250px] p-4 bg-gray-50">
            <div className="font-bold text-center text-xl mb-2">
                {planName}
                <p className="text-gray-700 text-base">{price} ETB / month</p>
            </div>
            <hr className='pb-6' />
            <ul className="list-disc pl-5 mb-4">
                {features.map((feature, index) => (
                    <div key={index} className='flex gap-4'>
                        <PiPerson />
                        <li>{feature}</li>
                    </div>
                ))}
            </ul>
            <button
                onClick={handleSubscribe}
                className="w-full py-2 px-4 border border-gray-500 bg-gray-100 text-blue-500 rounded-md shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Subscribe
            </button>
        </div>
    );
};

export default PlanCard;
