import React from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Message from '../../features/Message';

const RegisterComponents = ({formik,open,setOpen,message}) => {
  const cancelButtonRef = useRef(null)
  
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
                      <Dialog.Title as="h2" className=" text-xl text-center font-semibold">Create Merchant Account</Dialog.Title> 
                    <div className="overflow-auto">
                    <div className="container w-11/15 mx-auto px-3 bg-white rounded  ">
                      <div className="relative flex flex-col flex-auto min-w-0 p-4 break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-2 draggable " draggable="true">
                        <form onSubmit={formik.handleSubmit}>
                              <div >
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <span class="text-red-600">*</span></label>
                                <input type="text" name='name' onChange={formik.handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Name' required/>
                              </div>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <span class="text-red-600">*</span></label>
                                <input type="text" name='email' onChange={formik.handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Email' required/>
                              </div>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number <span class="text-red-600">*</span></label>
                                <input type="text" name='phoneNumber' onChange={formik.handleChange} id="phonenumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Number' required/>
                              </div>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alternate Number <span class="text-red-600">*</span></label>
                                <input type="text" name='Alternate_Phone_Number' onChange={formik.handleChange} id="alternatePhoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Alternate Number' required/>
                              </div>
                              <div className='grid gap-4 md:grid-cols-2 mt-3'>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Office No <span class="text-red-600">*</span></label>
                                  <input type="text" name='office' onChange={formik.handleChange} id="office_no" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Office No' required/>
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Building Name <span class="text-red-600">*</span></label>
                                  <input type="text" name='Building' onChange={formik.handleChange} id="building_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Building Name' required/>
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sector <span class="text-red-600">*</span></label>
                                  <input type="text" name='Sector' onChange={formik.handleChange} id="sector" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Sector' required/>
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode <span class="text-red-600">*</span></label>
                                  <input type="text" name='Pincode' onChange={formik.handleChange} id="pincode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter Pincode' required/>
                                </div>
                              </div>
                              <div className='mt-1 mb-6'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GST No <span class="text-red-600">*</span></label>
                                <input type="text" name='gstNumber' onChange={formik.handleChange} id="GST_No" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder='Enter GST No' required/>
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

export default RegisterComponents;