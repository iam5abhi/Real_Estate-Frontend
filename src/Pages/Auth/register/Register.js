import React,{useState,useEffect} from 'react'
import {Field, Form, Formik } from 'formik';
import {encode as base64_encode} from 'base-64';
import { NavLink, useNavigate } from 'react-router-dom';
import { validationSchemas } from '../../../features/Validation';
import {Token} from '../../../features/Token'
import { authFetch } from '../../../Middleware/axios/intance';
import { useLocation } from 'react-router-dom';
import { Citys,States } from '../../../TestHandler/IndianState';
import Message from '../../../features/Message';
import jwtDecode from 'jwt-decode';



const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [citys,setCitys]=useState()
  const [formData,setFormData]=useState({state:''})
  const [message,setMessage]=useState({message:'',type:''})

  const url = location.search ==='?type=mentor'?'api/mentor/registration':
              location.search==='?type=student'?'api/student/registration':
              location.search==='?type=enterprises'?'api/enterpricess/registration':
              location.search==='?type=campus'?'api/campus/registration':
                                 'api/student/registration'

  const Cityhandler =(e)=>{
    setCitys(Citys[e.target.value].split(','))
    setFormData({...formData,state:States[e.target.value-1]})
  }

  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmpassowrd,setShowConfirmpassowrd]=useState(false)

  const eye_Password=()=>{
    if(!showPassword){
      setShowPassword(true)
    }else{
      setShowPassword(false)
    }
  }

  const eye_Confirmpassowrd=()=>{
    if(!showConfirmpassowrd){
      setShowConfirmpassowrd(true)
    }else{
      setShowConfirmpassowrd(false)
    }
  }

  React.useEffect(() => {
    if(Token()){
      let decode = jwtDecode(Token())
    switch (decode.user.role) {
      case "student":
        navigate('/auth/student')
        break;
      case "mentor":
        navigate('/auth/mentors')
        break;
      case "campus":
        navigate('/auth/campus')
        break; 
      case "enterpricess":
        navigate('/auth/enterprises')
        break; 
    }
    }
    },[])

  return (
        <>
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="w-full max-w-md space-y-8 shadow-2xl rounded-lg px-5 py-5 bg-white">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register</h2>
              </div>
              <Formik
                initialValues={{name:'',email:'',PhoneNumber:'',password:'',confirmpassword:'',rememberme:''}}
                validationSchema={validationSchemas()}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async(values) => {
                let encodedPassword = base64_encode(values.password);
                let encodedconfirmpass = base64_encode(values.confirmpassword);
                try {
                  const res = await authFetch.post(url,{
                    name:values.name,
                    email:values.email,
                    phoneNumber:values.PhoneNumber,
                    state:formData.state,
                    city:values.city,
                    password:encodedPassword,
                    confirmPassword:encodedconfirmpass,
                  });
                  setMessage({message:res.data.message,type:true})
                  setTimeout(() => {
                    navigate('/login')
                  },3000);  
                  }catch (err) {
                    setMessage({message:err,type:false})
                  }
                }}>
                {({ errors, touched }) => (
                <Form className="mt-8 space-y-4 ">
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">{location.search==='?type=enterpricess'?"Business Name":location.search==='?type=campus'?"Campus Name":"Full Name"}</label>
                    <Field type="text" name='name' id="first_name" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.name ? " " : "border border-red-600 rounded-lg"}`} placeholder={location.search==='?type=enterpricess'?"Business Name":location.search==='?type=campus'?"Campus Name":"Full Name"} />
                    {errors.name && touched.name ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.name}</div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                    <Field type="text" name='PhoneNumber' id="phone" maxLength={10} minLength={10} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.PhoneNumber ? " " : "border border-red-600 rounded-lg"}`} placeholder="Phone Number" />
                    {errors.PhoneNumber && touched.PhoneNumber ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.PhoneNumber}</div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
                  <Field type="email" name='email' id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.email ? " " : "border border-red-600 rounded-lg"}`} placeholder="Email Address" />
                  {errors.email && touched.email ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.email}</div>
                    ) : null}
                </div> 
                <div className='grid gap-6 mb-6 md:grid-cols-2 mt-5'>
                    <div>
                      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Select an state</label>
                      <select id="countries" name='state' onChange={Cityhandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5">
                      <option selected>Choose a State</option>
                      {States.map((state,index)=>{
                        return <option value={index+1}>{state}</option>
                      })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Select an city</label>
                      <Field as="select" id="countries" name='city' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5">
                      <option selected>Choose a City</option>
                      {!citys?null:citys.map((city)=>{
                        return <option value={city}>{city}</option>
                      })}
                      </Field>
                    </div>
                  </div> 
                  <div className="eyeButton">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <Field type={!showPassword ? "password" : "text"} name='password' id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.password ? " " : "border border-red-600 rounded-lg"}`} placeholder="New Password" />
                    {/* <span className="flex justify-end pass">{!showPassword ? <i onClick={eye_Password} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Password} className="fa-solid fa-eye"></i>}</span> */} 
                    {errors.password && touched.password ? (
                    <div className='passchnge bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.password}</div>
                    ) : null}
                </div> 
                <div className="eyeButton">
                  <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                  <Field type={!showConfirmpassowrd ? "password" : "text"} name='confirmpassword' id="confirm_password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.confirmpassword ? " " : "border border-red-600 rounded-lg"}`} placeholder="Confirm Password" />
                  {/* <span className="flex justify-end pass">{!showConfirmpassowrd ? <i onClick={eye_Confirmpassowrd} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Confirmpassowrd} className="fa-solid fa-eye"></i>}</span> */}
                  {errors.confirmpassword && touched.confirmpassword ? (
                    <div className='passchnge bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.confirmpassword}</div>
                    ) : null}
                </div> 
                <div>
                  <br />
                  {message.type !==''?message.type===false?
                  <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                  :
                  <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                  :null}
                  <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    Register 
                  </button>
                  <h1 className='text-center mt-3 block text-sm font-bold text-gray-900'>Have an account? <NavLink to='/login' className='text-orange-600 hover:underline dark:text-orange-500 cursor-pointer' >Login</NavLink></h1>
                </div>
                </Form>
                 )}
                </Formik>
            </div>
          </div>
          
    </>
  )
}

export default Register