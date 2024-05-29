import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/verify/${token}`);
        setMessage(response.data.message);
        toast.success(response.data.message);
      } catch (error) {
        setMessage('Verification failed. The token might be invalid or expired.');
        toast.error('Verification failed. The token might be invalid or expired.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmailToken();
  }, [token]);

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-2xl mb-4">{message}</h1>
        {message === 'Email verified successfully' && (
          <button
            onClick={handleLoginClick}
            className="w-full text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
