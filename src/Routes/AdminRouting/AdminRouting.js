import React from 'react';
import { Route,Routes,Navigate} from 'react-router-dom';
import { Breathing } from 'react-shimmer';
import AdminLogin from '../../Pages/Auth/Admin/login/AdminLogin';
import Dashboard from '../../Pages/Admin/Dashboard/Dashboard';
// import Question from '../../Pages/Admin/Question';
import AdminPrivateRoute from '../../Middleware/Private Route/AdminPrivateRoute'
import AdminChangePass from '../../Pages/Change-Password/AdminChangePass';
import Merchant from '../../Components/Admin/Merchant/Merchant';
// import Category from "../../Components/Admin/Category/Category"
// import Mentors from '../../Components/Admin/Mentor/Mentors';
// import Campus from "../../Components/Admin/Campus/Campus"
// import Enterprises from '../../Components/Admin/Enterprises/Enterprises'
// import Projects from "../../Pages/Admin/Admin Upload Project/Projects"
// import UploadProject from '../../Pages/Admin/Admin Upload Project/UploadProject';
// import ProjectsEdit from '../../Pages/Admin/Admin Upload Project/ProjectsEdit';
// import ProjectsCopy from '../../Pages/Admin/Admin Upload Project/ProjectsCopy';
// import AssignmentRequests from '../../Pages/Admin/Assignment_Request/AssignmentRequest';


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
    }
  //   {
  //     path: 'questions',
  //     component: Question,
  //   },
  //   {
  //     path:'category',
  //     component:Category
  //   },
  //   {
  //     path:'mentors',
  //     component:Mentors
  //   },
  //   {
  //     path:'enterprises',
  //     component:Enterprises
  //   },
  //   {
  //     path:'campus',
  //     component:Campus
  //   },
  //   {
  //     path:'projects',
  //     component:Projects
  //   },
  //   {
  //     path:'upload-project',
  //     component:UploadProject
  //   },
  //   {
  //     path:'edit-project/:id',
  //     component:ProjectsEdit
  //   },
  //   {
  //     path:'copy-project/:id',
  //     component:ProjectsCopy
  //   },
  //   {
  //     path:'assignment',
  //     component:AssignmentRequests
  //   },
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