/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PlanCard from '../../components/paymentPlan/PlanCard';
import paymentimg from '../../assets/payment.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ApplyForCompany = () => {
    const [plan,setPlan]=useState([])

    useEffect(()=>{
        const fetchPlan =async()=>{
            try{
                const response=await axios.get("http://localhost:5000/api/admin/plans")
                if(response.status===200){
                    setPlan(response.data)
                    console.log(response.data)
                }
                else{
                console.log("you cannot fetch the plans")
                }
        }catch(error){
            console.error("the error is occured",error)
        }

            

        }
        fetchPlan()

    },[])
    console.log(plan)

    const plans = [
        {
            planName: 'Basic',
            price: 0,
            features: ['post 1 internship', 'basic profile of company', 'Feature 3'],
            planId: 'basic'
        },
        {
            planName: 'Silver',
            price: 200,
            features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 3', 'Feature 3'],
            planId: 'silver'
        },
        {
            planName: 'Gold',
            price: 500,
            features: ['Feature 1', 'Feature 2', 'Feature 3',],
            planId: 'gold'
        }
    ];

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
