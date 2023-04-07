import React,{useState,useEffect} from 'react'
import {Field, Form, Formik } from 'formik';
import {encode as base64_encode} from 'base-64';
import { useNavigate } from 'react-router-dom';
import { validationSchemas } from '../../../features/Validation';
import {Token} from '../../../features/Token'
import { authFetch } from '../../../Middleware/axios/intance';
import Message from '../../../features/Message';



const Register = () => {
  const navigate = useNavigate()
  const [message,setMessage]=useState({message:'',type:''})

  useEffect(() => {
    if(Token()){
      navigate('/auth/dealer')
    }
  })

  return (
        <>
          <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8 ">
            <div className="w-full max-w-lg space-y-8 shadow-2xl rounded-lg px-5 py-5 bg-white">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register</h2>
              </div>
              <Formik
                initialValues={{name:'',email:'',phoneNumber:'',Alternate_Phone_Number:'',office:'',
                Building:'',Sector:'',Pincode:'',gstNumber:'',password:"",confirm_password:""}}
                validationSchema={validationSchemas()}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async(values) => {
                let encodedPassword = base64_encode(values.password);
                let encodedconfirmpass = base64_encode(values.confirm_password);
                try {
                  const res = await authFetch.post("/api/merchant/registration",{
                    name:values.name, email:values.email, phoneNumber:values.phoneNumber,
                    Alternate_Phone_Number:values.Alternate_Phone_Number, office:values.office,
                    Building:values.Building, Sector:values.Sector, Pincode:values.Pincode,
                    gstNumber:values.gstNumber, password:encodedPassword, confirmPassword:encodedconfirmpass,
                  });
                  setMessage({message:res.data.message,type:true})
                  setTimeout(() => {
                    navigate('/login')
                  },1000);  
                  }catch (err) {
                    setMessage({message:err,type:false})
                  }
                }}>
                {({ errors, touched }) => (
              <Form>
                <div className='grid gap-2 md:grid-cols-2 mt-3'>
                 <div >
                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <span class="text-red-600">*</span></label>
                   <Field type="text" name='name' id="name" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.name ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Name' />
                   {errors.name && touched.name ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.name}</div>
                    ) : null}
                 </div>
                 <div>
                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <span class="text-red-600">*</span></label>
                   <Field type="text" name='email' id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.email ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Email' />
                   {errors.email && touched.email ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.email}</div>
                    ) : null}
                 </div>
                 <div>
                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number <span class="text-red-600">*</span></label>
                   <Field type="text" name='phoneNumber' id="phonenumber" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.phoneNumber ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Number' />
                   {errors.phoneNumber && touched.phoneNumber ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.phoneNumber}</div>
                    ) : null}
                 </div>
                 <div>
                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alternate Number <span class="text-red-600">*</span></label>
                   <Field type="text" name='Alternate_Phone_Number' id="alternatePhoneNumber" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.Alternate_Phone_Number ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Alternate Number' />
                   {errors.Alternate_Phone_Number && touched.Alternate_Phone_Number ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.Alternate_Phone_Number}</div>
                    ) : null}
                 </div>
                   <div>
                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Office No <span class="text-red-600">*</span></label>
                     <Field type="text" name='office' id="office_no" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.office ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Office No' />
                     {errors.office && touched.office ? (
                      <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.office}</div>
                    ) : null}
                   </div>
                   <div>
                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Building Name <span class="text-red-600">*</span></label>
                     <Field type="text" name='Building' id="building_name" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.Building ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Building Name' />
                     {errors.Building && touched.Building ? (
                     <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.Building}</div>
                    ) : null}
                   </div>
                   <div>
                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sector <span class="text-red-600">*</span></label>
                     <Field type="text" name='Sector' id="sector" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.Sector ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Sector' />
                     {errors.Sector && touched.Sector ? (
                      <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.Sector}</div>
                    ) : null}
                   </div>
                   <div>
                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode <span class="text-red-600">*</span></label>
                     <Field type="text" name='Pincode' id="pincode" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.Pincode ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Pincode' />
                     {errors.Pincode && touched.Pincode ? (
                      <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.Pincode}</div>
                    ) : null}
                   </div>
                   <div>
                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span class="text-red-600">*</span></label>
                     <Field type="password" name='password' id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.password ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Password' />
                     {errors.password && touched.password ? (
                      <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.password}</div>
                    ) : null}
                   </div>
                   <div>
                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password <span class="text-red-600">*</span></label>
                     <Field type="password" name='confirm_password' id="confirm_password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.confirm_password ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter Confirm Password' />
                     {errors.confirm_password && touched.confirm_password ? (
                      <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.confirm_password}</div>
                    ) : null}
                   </div>
                 </div>
                 <div className='mt-1 mb-6'>
                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GST No <span class="text-red-600">*</span></label>
                   <Field type="text" name='gstNumber' id="GST_No" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${!errors.gstNumber ? " " : "border border-red-600 rounded-lg"}`} placeholder='Enter GST No' />
                   {errors.gstNumber && touched.gstNumber ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.gstNumber}</div>
                    ) : null}
                 </div>
                 {message.type !==''?message.type===false?
                  <Message message={message.message} css='flex p-4 mb-5 -mt-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                  :
                  <Message message={message.message} css='flex p-4 mb-5 -mt-3 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                :null}
                 <div className='grid justify-items-center'>
                   <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400
                     focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 mb-2 focus:outline-none">Submit</button>
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