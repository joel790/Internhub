/* eslint-disable react/prop-types */
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
 const CompanyContact = ({companyDetail}) => {
  return (
    <div className="flex flex-col mt-6 px-4 py-4">
    <h1 className="text-2xl font-bold text-blue-600 text-center">Contact Us</h1>
    <div className="mt-6 bg-slate-400 rounded-xl flex flex-col md:flex-row md:justify-between py-10">
        <div className="flex flex-col md:flex-row items-center justify-center p-2">
            <MdEmail className="text-white mr-2" />
            <p className="text-white">{companyDetail.contacts.email}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center p-2 mt-4 md:mt-0">
            <FaPhoneAlt className="text-white mr-2" />
            <p className="text-white">{companyDetail.contacts.phone}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center p-2 mt-4 md:mt-0">
            <FaTwitter className="text-white mr-2" />
            <p className="text-white">{companyDetail.contacts.twitter}</p>
        </div>
    </div>
</div>
  )
}
export default CompanyContact
