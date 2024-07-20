import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CompanyForm from '../../pages/companies/compantform/CompanyForm';

const PaymentForm = () => {
    const { planId, price } = useParams();
    const [show,handleshowCompany]=useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center ">
            {!show&& <>
                <div className="w-full max-w-md  ">
                <h1 className="text-4xl font-bold mb-4">Payment Form</h1>
                <form className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">You choose Basic</label>

                        <label className="block text-sm font-medium text-gray-700">Price </label>
                        <input
                            type="text"
                            className="input mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={planId}
                            readOnly
                        />
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            className="input mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            placeholder='name'
                            type="text"
                            className="input mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                            placeholder='amount'
                            type="text"
                            className="input mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    {/* Add other payment form fields here */}
                    <button
                        type="submit"
                        className="  w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleshowCompany}
                    >
                        Pay Now
                    </button>
                </form>
            </div>
           
            </>}
            <div>
           
                {show&&<CompanyForm/>}
            </div>
        </div>
    );
};

export default PaymentForm;
