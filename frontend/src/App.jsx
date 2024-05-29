import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Layouts from "./pages/layout/Layout"
import Home from "./pages/homepage/Home"
import InternHome from "./pages/internships/InternHome"
import CompanyHome from "./pages/companies/CompanyHome"
import StudyHome from "./pages/study/StudyHome"
import CompanyDetail from './pages/companies/companydetail/CompanyDetail';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './components/email/VerifyEmail';
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="internship" element={<InternHome/>} />
          <Route path="company" element={<CompanyHome />} />
          <Route path="study" element={<StudyHome />} />
        </Route>
        <Route path="/auth/verify/:token" element={<VerifyEmail />} />
        <Route path="/company/:id" element={<CompanyDetail/>}/>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </BrowserRouter>
  );
};


export default App;
