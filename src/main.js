import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Layouts/Header/Header'
import AdminRouting from './Routes/AdminRouting/AdminRouting';
import MerchantRouting from './Routes/MerchantRouting/MerchantRouting';
import { useLocation } from 'react-router-dom';
import Register from './Pages/Auth/register/Register';
import Login from './Pages/Auth/login/Login';


const Main = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname.includes('/auth/admin')?null:
        <Header />}
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/auth/admin/*" element={<AdminRouting />} />
        <Route path="/auth/dealer/*" element={<MerchantRouting />} />
        <Route path="/register" element={< Register />} />
        <Route path="/login" element={< Login />} />
        <Route path="*" element={ < Navigate to='/auth/dealer' />} ></Route>
      </Routes>
    </>
  )
}

export default Main;