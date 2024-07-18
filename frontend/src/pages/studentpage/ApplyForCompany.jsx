import React from 'react';
import PlanCard from '../../components/paymentPlan/PlanCard';
import paymentimg from '../../assets/payment.png';
import { Link } from 'react-router-dom';

const ApplyForCompany = () => {
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
        <div className='min-h-screen  p-14 '>
            <div className=' flex flex-collg:flex-row py-6 px-14 gap-4 '>
                <div className="md:w-1/2 flex items-center justify-center bg-no-repeat bg-center">
                    <img src={paymentimg} alt="payment" />
                </div>
                <div className='text-center  w-1/2'>
                    <h1 className='text-3xl text-blue-500 py-4 font-bold font-serif'>choose your plane</h1>
                    <p className='text-slate-500'>the higher the plane you choose the more feature of the system yo get!</p>
                </div>
                <Link to="/student" className='text-red-500 text-xl underline '>cancel</Link>
            </div>
            <div className=" flex flex-col lg:flex-row gap-6 items-center justify-center pb-6 ">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.planId}
                        handleSubscribe={handleSubscribe}
                        planName={plan.planName}
                        price={plan.price}
                        features={plan.features}
                        planId={plan.planId}
                    />
                ))}

            </div>
        </div>
    );
};

export default ApplyForCompany;
