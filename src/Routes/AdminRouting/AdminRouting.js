import React from 'react';
import { Route,Routes,Navigate} from 'react-router-dom';
import { Breathing } from 'react-shimmer';
import AdminLogin from '../../Pages/Auth/Admin/login/AdminLogin';
import Dashboard from '../../Pages/Admin/Dashboard/Dashboard';
import AdminPrivateRoute from '../../Middleware/Private Route/AdminPrivateRoute'
import AdminChangePass from '../../Pages/Change-Password/AdminChangePass';
import Merchant from '../../Components/Admin/Merchant/Merchant';


const AdminRouting = () => {

  const adminroutes =[
    {
      path: '/',
      component: Dashboard,
    },
    {
      path:'merchants',
      component: Merchant,
    },
    {
      path:'change-password',
      component:AdminChangePass
    },
  ]

  return (
        <>
            <Routes>
                <Route path="login" element={ < AdminLogin />} />
                {
                  adminroutes.map((route) => (
                    <Route
                    path={route.path}
                    element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                    <AdminPrivateRoute> <route.component/> </AdminPrivateRoute> </React.Suspense>}/>
                ))
                }  
                <Route path="*" element={ < Navigate to="/auth/admin" />} ></Route>
            </Routes>
    </>
  )
}

export default AdminRouting;