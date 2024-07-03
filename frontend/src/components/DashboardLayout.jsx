/* eslint-disable react/prop-types */
import Sidebar from "./sidebar/Sidebar"
import DashboardHeader from "./header/DashboardHeader"
import { companySidebarData } from "../data/Data"
import { studentSideBardata } from "../data/Data"
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

import imagegeb from "../assets/gebbbb.jpg"
export const DashboardLayout = ({children,usertype}) => {
    const sidebardata=usertype==="company"?companySidebarData:studentSideBardata
    const handleprofileClick=()=>{
      console.log('profile is clicked')
    }
    const handlelogoutClick=()=>{
      console.log('logout is clicked')
    }
    const dropdowns=[
      {
        label:"Profile",
        icon:<CgProfile/>,
        onClick:handleprofileClick
      },
      {
        label:"Logout",
        icon:<IoIosLogOut/>,
        onClick:handlelogoutClick
      },
    ]
    
  return (
    <div className="flex flex-row w-full">
        <div className="min-h-screen bg-black " style={{width:"250px"}}> 
            <Sidebar data={sidebardata}/>
            </div>
            <div className="flex flex-col w-full"> 
            <div className="flex items-start w-full   bg-gray-100 p-2">
                <DashboardHeader image={imagegeb} name="gebeyehu" dropdown={dropdowns}/>
            </div>
            <div className="w-full bg-zinc-300 h-screen ml-16">
              {children}  
            </div>

            </div>
            
       
    </div>
  )
}
//for add internships form