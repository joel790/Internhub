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
import StudentHome from './pages/studentpage/StudentHome';
import Dashboard from "./pages/studentpage/Dashboard";

import Internships from "./pages/studentpage/Internships";
import Applications from "./pages/studentpage/Applications";
import PaymentSuccess from "./pages/studentpage/PaymentSuccess";
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
        <Route path="/student" element={<StudentHome />}>
          <Route index element={<StudHome />} />
          <Route path="apply" element={<ApplyForCompany />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="applications" element={<Applications />} />
          <Route path="internships" element={<InternHome />} />
          <Route path="companies" element={<CompanyHome />} />
        </Route>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        {/* <Route path="payment/:planId" element={<PaymentForm />} /> */}
        {/* <Route path="auth/verify/:token" element={<VerifyEmail />} /> */}
        <Route path="company/:id" element={<CompanyDetail />} />
        <Route path="/internship/all-internships" element={<AllInternships />} />
        <Route path="student/apply-company-form/:planId" element={<CompanyForm />} />
        <Route path="company/:id" element={<CompanyDetail />} />
        <Route path="/internship/:id" element={<InternshipDetail />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="auth/passwordreset/:resetToken" element={<ResetPassword />} />
        <Route path="/apply/:internshipTitle" element={<ApplicationForm />} />



        <Route path="/managerhome/*" element={<ManagerHome />}>



        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
