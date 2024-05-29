import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentForm = () => {
    const { planId } = useParams();

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-md  ">
                <h1 className="text-4xl font-bold mb-4">Payment Form</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">You choose Basic</label>
                        <input
                            type="text"
                            className="input mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={planId}
                            readOnly
                        />
                    </div>
                   
                    {/* Add other payment form fields here */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
