import React, { useState,useEffect } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Message from '../../../features/Message';
import { authFetch } from "../../../Middleware/axios/intance"


export default function MerchantEditModal({setOpen,open,id,GetMerchantData}) {
  const cancelButtonRef = useRef(null)
  const [message,setMessage]=useState({message:'',type:''})
  const [merchantData,setMerchantData]=useState({ name:"",phoneNumber:"",email:"",Alternate_Phone_Number:"",
                                                  office:"",Building:"",Sector:"",Pincode:"",gstNumber:"" })
  

  const EditChangeHandler =(e)=>{
    setMerchantData((pre)=>({
      ...pre,
      [e.target.name]:e.target.value
    }))
  }

  const EditSubmitHandler = async (event)=>{
      event.preventDefault();
      try {
        const resp = await authFetch.patch(`/api/admin/get-merchant/${id}`,merchantData);
        setMessage({message:resp.data.message,type:true})
        setTimeout(() => {
          setOpen(false)
          GetMerchantData()
        },1000);
      } catch (error) {
        setMessage({message:error,type:false})
        setTimeout(() => {
          setMessage({message:'',type:''})
        },1000);
      }
  }

  const GetSingleMerchantData = async ()=>{
    try {
      const resp = await authFetch(`/api/admin/get-merchant/${id}`);
      setMerchantData({ name:resp.data.data.name,email:resp.data.data.email,phoneNumber:resp.data.data.phoneNumber,Alternate_Phone_Number:
      resp.data.data.Alternate_Phone_Number,office:resp.data.data.address[0].Office,Building:resp.data.data.address[0].Building,
      Sector:resp.data.data.address[0].Sector,Pincode:resp.data.data.address[0].Pincode,gstNumber:resp.data.data.GST })
    } catch (error) {
      setMessage({message:error,type:false})
    }
  }

  React.useEffect(() => {
    GetSingleMerchantData()
  },[id])

  return (
    <Transition.Root show={open.isOpen} as={Fragment}>   
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-xl">
            <div className="max-w-screen mx-auto">
              <div className="container mx-auto">
                <div className="col-span-2">
                  <div className=" border-b border-gray-200 rounded">
                      <div className="text-end p-2">
                        <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xs font-extrabold bg-gray-400 h-5 leading-5 w-5 z-50 rounded-full text-center text-white"></i>
                      </div>
                      <Dialog.Title as="h2" className=" text-xl text-center font-semibold">Edit Merchant Account</Dialog.Title> 
                    <div className="overflow-auto">
                    <div className="container w-11/15 mx-auto px-3 bg-white rounded  ">
                      <div className="relative flex flex-col flex-auto min-w-0 p-4 break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-2 draggable " draggable="true">
                        <form onSubmit={EditSubmitHandler}>
                              <div >
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <span class="text-red-600">*</span></label>
                                <input type="text" name='name' value={merchantData.name} onChange={EditChangeHandler} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Name'/>
                              </div>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <span class="text-red-600">*</span></label>
                                <input type="text" name='email' value={merchantData.email} onChange={EditChangeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Email' />
                              </div>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number <span class="text-red-600">*</span></label>
                                <input type="text" name='phoneNumber' value={merchantData.phoneNumber} onChange={EditChangeHandler} id="phonenumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Number' />
                              </div>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alternate Number <span class="text-red-600">*</span></label>
                                <input type="text" name='Alternate_Phone_Number' value={merchantData.Alternate_Phone_Number} onChange={EditChangeHandler} id="alternatePhoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Alternate Number' />
                              </div>
                              <div className='grid gap-4 md:grid-cols-2 mt-3'>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Office No <span class="text-red-600">*</span></label>
                                  <input type="text" name='office' value={merchantData.office} onChange={EditChangeHandler} id="office_no" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Office No' />
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Building Name <span class="text-red-600">*</span></label>
                                  <input type="text" name='Building' value={merchantData.Building} onChange={EditChangeHandler} id="building_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Building Name' />
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sector <span class="text-red-600">*</span></label>
                                  <input type="text" name='Sector' value={merchantData.Sector} onChange={EditChangeHandler} id="sector" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Sector' />
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode <span class="text-red-600">*</span></label>
                                  <input type="text" name='Pincode' value={merchantData.Pincode} onChange={EditChangeHandler} id="pincode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Pincode' />
                                </div>
                              </div>
                              <div className='mt-1 mb-6'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GST No <span class="text-red-600">*</span></label>
                                <input type="text" name='gstNumber' value={merchantData.gstNumber} onChange={EditChangeHandler} id="GST_No" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter GST No' />
                              </div>
                              <div className='grid justify-items-center'>
                                <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400
                                  focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 mb-2 focus:outline-none">Submit</button>
                              </div>
                        </form>
                      </div>
                    </div>
                    {message.type !==''?message.type===false?
                    <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'/>
                    :
                    <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
                    :null}
              </div>
              </div>
            </div>
          </div>
         </div>
        </Dialog.Panel>
        </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  )
}
