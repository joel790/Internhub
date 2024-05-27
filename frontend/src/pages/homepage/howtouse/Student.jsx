import React from 'react'
import { CgProfile  } from 'react-icons/cg'
import { BsBrowserEdge, BsHandIndexThumb  } from 'react-icons/bs'
import student from '../../../assets/student.png'

const Student = () => {
  return (
    <div className='bg-gray-50 rounded-md lg:p-10 flex flex-col lg:flex-row justify-between'>
      <div className=' w-full lg:w-1/2'>
        <img src={student} alt="Student" />
      </div>
      <div className=' w-full lg:w-1/2  p-6'>
        <div className='flex gap-6  my-4 p-4'>
         <CgProfile size={60}/>
          <div className='flex-col'>
            <h1 className='text-2xl'>Create Profile</h1>
            <p className='text-gray-600'>click get started or signup button to create account or profile</p>
          </div>
        </div>
        <div className='flex gap-6  my-4 p-4'>
         <BsBrowserEdge size={60}/>
          <div className='flex-col'>
            <h1 className='text-2xl'>Browse interns</h1>
            <p className='text-gray-600'>click on the internship link in the header and find check it favors you</p>
          </div>
        </div>
        <div className='flex gap-6  my-4 p-4'>
         <BsHandIndexThumb size={60}/>
          <div className='flex-col'>
            <h1 className='text-2xl'>Apply internship</h1>
            <p className='text-gray-600'>click the view button read and check eligibility criteria and apply the internship</p>
          </div>
        </div>
     
      </div>
    </div>
  )
}

export default Student