/* eslint-disable react/prop-types */

import { useState } from "react"

 const DashboardHeader = ({image,name,dropdown}) => {
  const [showdropdown,setShowdropdown]=useState(false)
  const handelChangeprofile=()=>{
    setShowdropdown(!showdropdown)
  }
  return (
    <div className="w-full p-4 bg-orange-300 ">
    <div className="flex flex-row justify-end items-center gap-2">
      <img
        src={image}
        alt="there is no user image"
        className="object-cover rounded-full h-10 w-10 cursor-pointer"
        onClick={handelChangeprofile}
      />
      {
        showdropdown&&
        <div className="absolute top-16 right-0 w-40 bg-white text-center rounded-lg py-4 z-10 ">
  <ul>
    {dropdown.map((drop, index) => (
      <li key={index} onClick={drop.onClick} className="cursor-pointer hover:text-slate-500 py-2 px-4">
        <div className="flex items-center justify-center">
          <span className="mr-2">{drop.icon}</span>
          <h3 className="text-sm">{drop.label}</h3>
        </div>
      </li>
    ))}
  </ul>
</div>
          
        
      }
     
      <h1 className="text-lg font-semibold">{name}</h1>
    </div>
  </div>
  )
}
export default DashboardHeader
