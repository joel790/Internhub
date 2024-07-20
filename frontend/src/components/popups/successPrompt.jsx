import React from 'react';
import { useNavigate } from 'react-router';

const SuccessPopup = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    onClose();
    navigate('/student');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Success</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={handleOkClick}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
