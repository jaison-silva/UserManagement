import React from "react";
import { Routes, Route } from 'react-router-dom';
import LoginMain from './Pages/Login/main';
import HomeMain from './Pages/Home/main';
import AdminMain from './Pages/admin/main'
import Profile from './Pages/Profile/Profile'
import Register from "./Pages/register/register";
import './input.css'; 


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginMain />} />
        <Route path="/register" element={< Register/>} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/home" element={<HomeMain />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div>Check the route bro!</div>} />
      </Routes>
  );
};

export default App;
