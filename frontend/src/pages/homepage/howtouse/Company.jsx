import React from 'react'
import { CgProfile  } from 'react-icons/cg'
import {  BsHandIndexThumb  } from 'react-icons/bs'
import { MdPostAdd } from "react-icons/md";

import company from '../../../assets/company.png'
const Company = () => {
  return (
    <div className='bg-gray-50 rounded-md lg:p-10 flex flex-col lg:flex-row justify-between'>
      <div className=' w-full lg:w-1/2'>
        <img src={company} alt="Student" />
      </div>
      <div className=' w-full lg:w-1/2  p-6'>
        <div className='flex gap-6  my-4 p-4'>
         <CgProfile size={55}/>
          <div className='flex-col'>
            <h1 className='text-2xl'>Create Profile</h1>
            <p className='text-gray-600'>click get started or signup button to create account or profile</p>
          </div>
        </div>
        <div className='flex gap-6  my-4 p-4'>
         <BsHandIndexThumb size={60}/>
          <div className='flex-col'>
            <h1 className='text-2xl'>Apply for hiring</h1>
            <p className='text-gray-600'>click on the Apply for hiring button after creating account and follow the steps specified</p>
          </div>
        </div>
        <div className='flex gap-6  my-4 p-4'>
         <MdPostAdd size={60}/>
          <div className='flex-col'>
            <h1 className='text-2xl'>Post internships</h1>
            <p className='text-gray-600'>After finishing all the steps specified and your request is accepted  you can post internships for stuudents</p>
          </div>
        </div>
     
      </div>
    </div>
  )
}

export default Company