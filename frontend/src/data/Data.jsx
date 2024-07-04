import { FaUserEdit } from "react-icons/fa";
import { SiIntercom } from "react-icons/si";
import { MdDashboard } from "react-icons/md";

export const companySidebarData=[
    {
    icon:<MdDashboard/>,
    heading:"Dashboard",
    link:"companydashboard"



},
{
    icon:<FaUserEdit/>,
    heading:"User",
    link:"appliedinternship"



},
{
    icon:<SiIntercom/>,
    heading:"Internships",
    link:"postedinternship"



},

]
export const studentSideBardata=[
    {
    icon:<MdDashboard/>,
    heading:"Dashboard",
    link:"/managerhome/companydashboard"



},
{
    icon:<FaUserEdit/>,
    heading:"User",
    link:"/managerhome/appliedinternship"



},
{
    icon:<SiIntercom/>,
    heading:"Internships",
    link:"/managerhome/postedinternship"



},

]