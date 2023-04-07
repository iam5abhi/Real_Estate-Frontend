import React, { useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import {encode as base64_encode} from 'base-64';
import { Formik, Form, Field } from 'formik';
import { loginvalidationSchemas } from '../../../features/Validation';
import {Token} from '../../../features/Token'
import { authFetch } from "../../../Middleware/axios/Interceptors"
import Message from '../../../features/Message';
import img from "../../../Assets/Images/merchant.jpg"



const Login = () => {
  const navigate =useNavigate()
  const [showPassword,setShowPassword]=React.useState(false)
  const [message,setMessage]=useState({message:'',type:''})


  React.useEffect(() => {
    if(Token()){
      navigate('/auth/dealer')
    }
  })

  return (
        <>
           <div class="flex items-center min-h-screen p-4 lg:justify-center shadow-2xl rounded-lg">
            <div class="flex flex-col overflow-hidden bg-white rounded-md shadow-xl max md:flex-row md:flex-1 lg:max-w-screen-md">
              <div className="p-4 py-6 text-white bg-orange-200 md:w-96 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                <div className="my-3 text-4xl font-bold tracking-wider text-center">
                  <a href="#">
                    <img className="w-56" src={img} />
                  </a>
                </div>
              </div>
              <div className='p-10 bg-white md:flex-1'>
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
                    const res = await authFetch.post('/api/merchant/login',{
                      email:values.email,
                      password:encodedPassword,
                    });
                      setMessage({message:res.data.message,type:true})
                      setTimeout(() => {
                        localStorage.setItem("token",res.data.token,true)
                        navigate(`/auth/dealer`)
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
                    <Field type="text" name='email' id="first_name"  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:border-gray-200 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-orange-500 dark:focus:border-orange-500 ${!errors.email ? " " : "border border-red-600 rounded-lg"}`} placeholder="Email Address" />
                    {errors.email && touched.email ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.email}</div>
                    ) : null}
                  </div>
                  <br />
                  <div className="mb-6 eyeButton">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <Field type={!showPassword ? "password" : "text"} name='password' id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5  dark:border-gray-200 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-orange-500 dark:focus:border-orange-500 ${!errors.password ? " " : "border border-red-600 rounded-lg"}`} 
                     onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" placeholder="Password" />
                     {errors.password && touched.password ? (
                      <div className='passchnge bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.password}</div>
                    ) : null}
                </div> 
                </div>
                {message.type !==''?message.type===false?
                  <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                  :
                  <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                :null}
                <div>
                  <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    Login
                  </button>
                  <h1 className='mt-3 text-center block text-sm font-bold text-gray-900'> Don't have a account? <NavLink to='/register' className='text-orange-600 hover:underline dark:text-orange-500 cursor-pointer' >Register</NavLink></h1>
                </div>
                </Form>
                )}
                </Formik>
            </div>
            </div>
          </div> 
    </>
  )
}

export default Login;