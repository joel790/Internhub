// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const planId = queryParams.get('planId');
    const status = queryParams.get('status');

    useEffect(() => {
        const handlePaymentCallback = async () => {
            if (status === 'success') {
                navigate(`/apply-company-form/${planId}`);
            } else {
                alert('Payment failed. Please try again.');
                navigate('/subscribe');
            }
        };

        handlePaymentCallback();
    }, [status, planId, navigate]);

    return <div>Processing payment...</div>;
};

export default PaymentSuccess;
