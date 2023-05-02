import React, { useState } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Message from '../../../features/Message';
import { useFormik } from 'formik';
import { authFetch } from "../../../Middleware/axios/intance"

const bhkData = [
  { type: "residential", name:'BHK Type' ,option1:'2bhk', option2:'3bhk', option3:'4bhk'},
  { type: "commercial", name:'Commercial Area', option1:'1500sf', option2:'2000sf', option3:'2500sf'},
  { type: "ploting", name:'Ploting Area', option1:'1000sf', option2:'2000sf', option3:'3000sf' }
]
export default function ApartmentAddModal({ setOpen, open, GetPropertyData }) {
  const cancelButtonRef = useRef(null)
  const [message, setMessage] = useState({ message: '', type: '' })
  const [formData, setFromData] = useState({ rangeValue: 10, property_type: '' })

  const FormDataHandler = (event) => {
    setFromData((pre) => ({
      ...pre,
      [event.target.name]: event.target.value
    }))
  }


  const formik = useFormik({
    initialValues: { project_name: '',location:'' },
    onSubmit: async values => {
      console.log(values, "values")
      try {
        const resp = await authFetch.post('/api/admin/property',values);
        setMessage({message:"Add Property Successfully",type:true})
        setTimeout(() => {
          setOpen(false)
          GetPropertyData()
          setMessage({message:'',type:''})
        },1000);
      } catch (error) {
        setMessage({message:error,type:false})
      }
    },
  });

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
                        <Dialog.Title as="h2" className=" text-xl text-center font-semibold">Add Apartment</Dialog.Title>
                        <div className="overflow-auto">
                          <div className="container w-11/15 mx-auto px-3 bg-white rounded  ">
                            <div className="relative flex flex-col flex-auto min-w-0 p-4 break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-2 draggable " draggable="true">
                              <form onSubmit={formik.handleSubmit}>
                                <div >
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name <span class="text-red-600">*</span></label>
                                  <input type="text" name='project_name' onChange={formik.handleChange} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Project Name' required />
                                </div>
                                <div className='mt-1 mb-5'>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location <span class="text-red-600">*</span></label>
                                  <input type="text" name='location' onChange={formik.handleChange} id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Location' required />
                                </div>
                                {/* <div className='mt-1'>
                                  <h1 className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Property Type <span class="text-red-600">*</span></h1>
                                  <input type="radio" name='property_type' value='residential' onChange={FormDataHandler} id="description" className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                                  <label className="text-sm font-medium text-gray-900 dark:text-white"> Residential </label>
                                  <input type="radio" name='property_type' value='commercial' onChange={FormDataHandler} id="description" className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                                  <label className="text-sm font-medium text-gray-900 dark:text-white"> Commercial </label>
                                  <input type="radio" name='property_type' value='ploting' onChange={FormDataHandler} id="description" className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                                  <label className="text-sm font-medium text-gray-900 dark:text-white"> Ploting </label>
                                </div>
                                { formData.property_type.length==0?null:
                                  <div className='mt-1 mb-5'>
                                  {bhkData.map((data) => {
                                    if (data.type == formData.property_type) {
                                      return <>
                                        <h1 className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{data.name} <span class="text-red-600">*</span></h1>
                                        <input type="radio" name='bhk_type' value={data.option1} onChange={formik.handleChange} id="description" className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                                        <label className="text-sm font-medium text-gray-900 dark:text-white"> {data.option1} </label>
                                        <input type="radio" name='bhk_type' value={data.option2} onChange={formik.handleChange} id="description" className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                                        <label className="text-sm font-medium text-gray-900 dark:text-white"> {data.option2} </label>
                                        <input type="radio" name='bhk_type' value={data.option3} onChange={formik.handleChange} id="description" className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                                        <label className="text-sm font-medium text-gray-900 dark:text-white"> {data.option3} </label>
                                      </>
                                    }
                                  })}
                                </div>}
                                <div className='mt-1 mb-5'>
                                  <h1 className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price(10K To 1L) <span class="text-red-600">*</span></h1>
                                  <input type="range" name='range' min={10} max={100} step={5} value={formData.rangeValue} onChange={FormDataHandler} id="description" className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                                  <label className="text-sm font-medium text-gray-900 dark:text-white">{formData.rangeValue}K </label>
                                </div> */}
                                <div className='grid justify-items-center'>
                                  <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400
                                  focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 mb-2 focus:outline-none">Submit</button>
                                </div>
                              </form>
                            </div>
                          </div>
                          {message.type !== '' ? message.type === false ?
                            <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg' />
                            :
                            <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
                            : null}
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
