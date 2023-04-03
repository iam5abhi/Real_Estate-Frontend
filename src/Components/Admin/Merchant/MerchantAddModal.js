import React from 'react';
import { useState } from 'react'
import { useFormik } from 'formik';
import { authFetch } from "../../../Middleware/axios/intance"
import RegisterComponents from '../../ComanRegisterComponents/RegisterComponents';


export default function MerchantAddModal({setOpen,open,GetMerchantData}) {
  const [message,setMessage]=useState({message:'',type:''})

  const formik = useFormik({
    initialValues: { city:'' },
    onSubmit : async values => {
      try {
        const resp = await authFetch.post('/api/admin/add-merchant',values);
        setMessage({message:resp.data.message,type:true})
        setTimeout(() => {
          setOpen(false)
          GetMerchantData()
          setMessage({message:'',type:''})
        },1000);
      } catch (error) {
        setMessage({message:error,type:false})
      }
  },
  });

  return (
    <RegisterComponents formik={formik} open={open} setOpen={setOpen} message={message}  />
  )
}
