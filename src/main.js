import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AdminRouting from './Routes/AdminRouting/AdminRouting';

import { Token } from './features/Token';
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import ChangePassword from './Pages/Change-Password/ChangePassword';

const Main = () => {
  const location = useLocation()
  const [decode,setDecode]=useState()

  useEffect(()=>{
    if(Token()){
      let decode = jwtDecode(Token())
      setDecode(decode)
    }
  },[Token()])
  
  return (
    <>
      {/* <div>{location.pathname.includes('/auth/admin')?null:
        <Header />}</div> */}
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/auth/admin/*" element={<AdminRouting />} />
        <Route path="/change-password" element={< ChangePassword />} />
      </Routes>
    </>
  )
}

export default Main;