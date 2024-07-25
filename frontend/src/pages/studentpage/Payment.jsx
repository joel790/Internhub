import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/transactions');
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Failed to fetch payments');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Payment Transactions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left">STATUS</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">CUSTOMER</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">AMOUNT</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">PAYMENT METHOD</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">CHAPA REFERENCE</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">MERCHANT REFERENCE</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">TYPE</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">DATE</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">{payment.status}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{payment.customer}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{payment.amount}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{payment.payment_method}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{payment.chapa_reference}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{payment.merchant_reference}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{payment.type}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payment;
