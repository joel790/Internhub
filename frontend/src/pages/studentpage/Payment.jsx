import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/transaction');
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setPayments(response.data);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch payments');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div className="text-center text-xl mt-5">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-xl mt-5">{error}</div>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Paid Payments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Transaction Reference</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Currency</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.tx_ref}>
                <td className="py-2 px-4 border-b">{payment.tx_ref}</td>
                <td className="py-2 px-4 border-b">{payment.amount}</td>
                <td className="py-2 px-4 border-b">{payment.currency}</td>
                <td className="py-2 px-4 border-b">{payment.email}</td>
                <td className="py-2 px-4 border-b">{new Date(payment.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
