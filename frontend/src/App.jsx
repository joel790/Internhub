import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Layouts from "./pages/layout/Layout"
import Home from "./pages/homepage/Home"
import InternHome from "./pages/internships/InternHome"
import CompanyHome from "./pages/companies/CompanyHome"
import StudyHome from "./pages/study/StudyHome"
import { ToastContainer } from "react-toastify"

import axios from "axios";
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
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
