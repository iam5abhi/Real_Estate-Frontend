import React,{useState, useEffect} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Layouts/Header/Header'
import AdminRouting from './Routes/AdminRouting/AdminRouting';
import MerchantRouting from './Routes/MerchantRouting/MerchantRouting';
import { useLocation } from 'react-router-dom';
import Register from './Pages/Auth/register/Register';
import Login from './Pages/Auth/login/Login';
import { authFetch } from './Middleware/axios/intance';
import AllProperty from './Pages/Property/AllProperty';
import SingleProperty from './Pages/Property/SingleProperty';
import Test from './TestHandler/Test';


const Main = () => {
  const location = useLocation()
  const [subscriptionData,setSubscriptionData]=useState()


  const GetSubscriptionData = async () => {
    try {
        const resp = await authFetch.get(`/api/merchant/suscription`)
        setSubscriptionData(resp.data.data)
    } catch (error) {
        // setMessage({ message: error, type: false })
    }
  }
      
  useEffect(() => {
    GetSubscriptionData()
  },[])

  return (
    <>
      {location.pathname.includes('/auth/admin')?null:
        <Header subscriptionData={subscriptionData} setSubscriptionData={setSubscriptionData} />}
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/auth/admin/*" element={<AdminRouting />} />
        <Route path="/auth/dealer/*" element={<MerchantRouting subscriptionData={subscriptionData} />} />
        <Route path="/register" element={< Register />} />
        <Route path="/login" element={< Login GetSubscriptionData={GetSubscriptionData}/>} />
        <Route path="/property" element={< AllProperty />} />
        <Route path="/property-details/:id" element={< SingleProperty />} />
        <Route path="*" element={ < Navigate to='/auth/dealer' />} ></Route>
        <Route path="/test" element={< Test />} />
      </Routes>
    </>
  )
}

export default Main;