import { FaUserEdit } from "react-icons/fa";
import { SiIntercom } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { BiStats } from "react-icons/bi";
import { RiProfileLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";

export const companySidebarData = [
  {
    icon: <MdDashboard />,
    heading: "Dashboard",
    link: "companydashboard",
  },
  {
    icon: <FaUserEdit />,
    heading: "User",
    link: "appliedinternship",
  },
  {
    icon: <SiIntercom />,
    heading: "Internships",
    link: "postedinternship",
  },
];

export const studentSideBardata = [
  {
    icon: <MdDashboard />,
    heading: "Dashboard",
    link: "/managerhome/companydashboard",
  },
  {
    icon: <FaUserEdit />,
    heading: "User",
    link: "/managerhome/appliedinternship",
  },
  {
    icon: <SiIntercom />,
    heading: "Internships",
    link: "/managerhome/postedinternship",
  },
];

export const adminSidebarData = [
  {
    icon: <MdDashboard />,
    heading: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    icon: <SiIntercom />,
    heading: "Company Applications",
    link: "/admin/company-applications",
  },
  {
    icon: <GiMoneyStack />,
    heading: "Pricing Plans",
    link: "/admin/pricing-plans",
  },
  {
    icon: <BiStats />,
    heading: "Statistics",
    link: "/admin/statistics",
  },
  {
    icon: <RiProfileLine />,
    heading: "Profile Management",
    link: "/admin/profile",
  },
];
