import React, { useState, useEffect } from 'react'
import { authFetch } from '../../Middleware/axios/intance'
import Message from '../../features/Message'
import { useParams } from 'react-router-dom'
import { Breathing } from 'react-shimmer'

const SingleProperty = () => {
    const {id} = useParams()
    const [message, setMessage] = useState({ message: '', type: '' })
    const [propertyData, setPropertyData] = useState()

    const GetPropertyData = async () => {
        try {
            const resp = await authFetch(`/${id}`);
            setPropertyData(resp.data.data)
        } catch (error) {
            setMessage({ message: error, type: false })
        }
    }

    useEffect(() => {
        GetPropertyData()
    }, [])

  return (
        <>
            {message.type !== '' ? message.type === false ?
            <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg' />
            :
            <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
            : null}
            <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8 ">
                <div className="w-full  space-y-8  rounded-lg px-5 py-5 ">
                <section className="border border-gray-200 rounded-lg px-4 py-10">
                    <div className="grid grid-cols-2 gap-20  ">
                    <div>
                        <h2 className=" text-start text-3xl font-bold tracking-tight text-gray-900">{!propertyData?<Breathing width={800} height={100} />:propertyData.PropertId.project_name.toUpperCase()} <span className='text-xl font-normal text-gray-600'>({!propertyData?null:propertyData.PropertId.location})</span></h2>
                    </div>
                    <div className="text-end">
                    <button type="button" onClick={()=>''} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">Enquire Now</button> 
                    </div>
                    </div>
                    <br />
                    <div>
                    <h3 className='text-start text-2xl font-bold tracking-tight text-gray-900 mb-6 underline'>Property Description</h3>  
                        <p className="break-word mt-2 mb-2 max-w-screen-md text-lg text-gray-600 leading-6">Property Type : {!propertyData?<Breathing width={1200} height={1000} />:propertyData.propertytype}</p>
                        <p className="break-word mt-2 mb-2 max-w-screen-md text-lg text-gray-600 leading-6">Property Name : {!propertyData?<Breathing width={1200} height={1000} />:propertyData.propertyname}</p>
                        <p className="break-word mt-2 mb-2 max-w-screen-md text-lg text-gray-600 leading-6">BHK : {!propertyData?<Breathing width={1200} height={1000} />:propertyData.propertybhk}</p>
                    </div>
                </section>
                </div>
            </div>
        </>
  )
}

export default SingleProperty