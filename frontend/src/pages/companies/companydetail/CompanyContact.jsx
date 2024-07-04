/* eslint-disable react/prop-types */
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
 const CompanyContact = ({companyDetail}) => {
  return (
    <div className="flex flex-col mt-6 px-10 py-4">
    <h1 className="text-2xl font-bold text-blue-600 text-center">Contact Us</h1>
    <div className="mt-6 bg-gray-400 rounded-xl flex flex-col md:flex-row md:justify-between py-20 px-10 text-black">
        <div className="flex flex-col md:flex-col items-center gap-2 justify-center p-2">
            <MdEmail className=" text-4xl mr-2 text-slate-900" />
            <p className="font-bold">{companyDetail.contacts.email}</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-col items-center justify-center p-2 mt-4 md:mt-0">
            <FaPhoneAlt className=" mr-2 text-4xl text-slate-900" />
            <p className="font-bold">{companyDetail.contacts.phone}</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-col items-center justify-center p-2 mt-4 md:mt-0">
            <FaTwitter className="mr-2 text-4xl text-slate-900" />
            <p className="font-bold">{companyDetail.contacts.twitter}</p>
        </div>
    </div>
</div>
  )
}
export default CompanyContact
