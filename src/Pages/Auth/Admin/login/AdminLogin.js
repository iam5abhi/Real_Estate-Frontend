import React, { useState } from 'react'
import { useNavigate,Outlet } from 'react-router-dom';
import {encode as base64_encode} from 'base-64';
import { Formik, Form, Field } from 'formik';
import { loginvalidationSchemas } from '../../../../features/Validation';
import {AdminToken} from '../../../../features/Token'
import { authFetch } from "../../../../Middleware/axios/Interceptors"
import Message from '../../../../features/Message';
import img from "../../../../Assets/Images/admin.png"

const AdminLogin = () => {
  const navigate =useNavigate()
  const [showPassword,setShowPassword]=React.useState(false)
  const [message,setMessage]=useState({message:'',type:''})

  const eye_Password=()=>{
      if(!showPassword){
        setShowPassword(true)
      }else{
        setShowPassword(false)
      }
    }

    React.useEffect(() => {
      if(AdminToken()){
        navigate('/auth/admin')
      }
    },[])

  return (
        <>
          <div class="flex items-center lg:min-h-screen mt-24 lg:m-auto p-4 bg-white justify-center lg:shadow-2xl shadow-md rounded-lg">
            <div class="flex flex-col overflow-hidden bg-white rounded-md lg:shadow-xl shadow-sm max md:flex-row md:flex-1 lg:max-w-screen-md">
              <div className="p-4 py-6 text-white bg-cyan-400/75 md:w-96 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                <div className="my-3 text-4xl font-bold tracking-wider text-center">
                  <a href="#">
                    <img className="w-auto lg:w-56" src={img} />
                  </a>
                </div>
              </div>
              <div className='p-4 lg:p-10 bg-white md:flex-1'>
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login</h2>
              </div>
              <Formik
                  initialValues={{
                    email: '',
                    password:"",
                 }}
                 validationSchema={loginvalidationSchemas()}
                 validateOnChange={false}
                 validateOnBlur={false}
                 onSubmit={async(values) => {
                  let encodedPassword = base64_encode(values.password);
                  try {
                    const res = await authFetch.post('api/admin/login',{
                      email:values.email,
                      password:encodedPassword,
                    });
                    localStorage.setItem('admin-token',res.data.token,true)
                    setMessage({message:res.data.message,type:true})
                    setTimeout(() => {
                      navigate('/auth/admin')
                    },1000);
                    }catch (err) {
                      setMessage({message:err,type:false})
                    }
                }}>
                {({ errors, touched }) => (
                <Form className="mt-8 space-y-6">
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <Field type="text" name='email' id="first_name" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5${!errors.email ? " " : "border border-red-600 rounded-lg"}`} placeholder="admin@admin.com" />
                    {errors.email && touched.email ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.email}</div>
                    ) : null}
                  </div>
                  <br />
                  <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <Field type={!showPassword ? "password" : "text"} name='password' id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.password ? " " : "border border-red-600 rounded-lg"}`} placeholder="admin@123" />
                    {/* <span className="flex justify-end pass">{!showPassword ? <i onClick={eye_Password} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Password} className="fa-solid fa-eye"></i>}</span> */}
                    {errors.password && touched.password ? (
                      <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.password}</div>
                    ) : null}
                </div> 
                </div>
                {/*<div className="flex items-center justify-between">
                   <div className="flex items-center">
                  <Field id="remember-me" name="rememberme" type="checkbox" className={`h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 ${!errors.rememberme ? " " : "border-2 border-red-600"}`}/>
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label> 
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-orange-600 hover:text-orange-400">Forgot your password?</a>
                  </div> 
                </div>*/}
                {message.type !==''?message.type===false?
                  <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                  :
                  <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                :null}
                <div>
                  <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    Login
                  </button>
                </div>
                </Form>
                )}
                </Formik>
            </div>
            </div>
          </div>
          <Outlet />
    </>
  )
}

export default AdminLogin;