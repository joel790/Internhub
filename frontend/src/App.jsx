// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyForm from "./pages/companies/compantform/CompanyForm";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layouts from "./pages/layout/Layout";
import Home from "./pages/homepage/Home";
import InternHome from "./pages/internships/InternHome";
import AllInternships from "./pages/internships/AllInternships";
import CompanyHome from "./pages/companies/CompanyHome";
import StudyHome from "./pages/study/StudyHome";
import CompanyDetail from "./pages/companies/companydetail/CompanyDetail";
import InternshipDetail from "./pages/internships/InternshipDetail";
import ApplicationForm from "./pages/internships/ApplicationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ManagerHome from "./pages/companies/companyManager/ManagerHome";
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './components/email/VerifyEmail';
import ResetPassword from './pages/auth/ResetPassword';
import PaymentForm from './components/payment/PaymentForm';
import ApplyForCompany from './pages/studentpage/ApplyForCompany';
import StudHome from './pages/studentpage/StudHome';
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="internship" element={<InternHome />} />
          <Route path="company" element={<CompanyHome />} />
          <Route path="study" element={<StudyHome />} />
        </Route>
        <Route path="form" element={<CompanyForm />} />
        <Route path="apply" element={<ApplyForCompany />} />
        <Route path="Student" element={<StudHome />} />
        <Route path="payment/:planId" element={<PaymentForm />} />
        <Route path="auth/verify/:token" element={<VerifyEmail />} />
        <Route path="company/:id" element={<CompanyDetail />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="auth/passwordreset/:resetToken" element={<ResetPassword />} />
        <Route path="/internship/all-internships" element={<AllInternships />} />
        <Route path="/internship/:id" element={<InternshipDetail />} />
        <Route path="/apply/:internshipTitle" element={<ApplicationForm />} />
        <Route path="/managerhome/*" element={<ManagerHome/>}>
          

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
