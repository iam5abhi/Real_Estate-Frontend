import React, { useState, useEffect } from 'react'
import { authFetch } from '../../Middleware/axios/intance'
import Message from '../../features/Message'
import { Breathing } from 'react-shimmer'
import { useNavigate } from 'react-router-dom'

const Apartment = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState({ message: '', type: '' })
    const [propertyData, setPropertyData] = useState()

    const GetPropertyData = async () => {
        try {
            const resp = await authFetch(`/${'id'}`);
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
                        <h2 className=" text-start text-3xl font-bold tracking-tight text-gray-900">BESTECH GROUPS</h2>
                    </div>
                    </div>
                    <br />
                    <div>
                    <h3 className='text-start text-2xl font-bold tracking-tight text-gray-900 mb-6 underline'>LOCATION</h3>  
                    <p className="break-word mt-2 mb-2 max-w-screen-md text-lg text-gray-600 leading-6"> Sector 67, Mohali
                        {/* {!propertyData?<Breathing width={1200} height={1000} />:propertyData.description} */}
                        </p>
                    </div>
                </section>
                </div>
            </div>
            <div className="px-2 py-4 max-w-screen-xl mx-auto">
            <h3 className='text-start text-2xl font-bold tracking-tight text-gray-900 mb-6 underline'>Residential</h3> 
            <div className="grid grid-cols-3 gap-4 rounded px-6 py-6">
                {!propertyData?null:propertyData.map(datas=>(
                    <div className="text-center">
                    <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{datas.title}</h5>
                        <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">{datas.description}</h5>
                        <button type="button" onClick={()=>navigate(`/property-details/${datas._id}`)} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">View More</button>
                    </span>
                    </div>
                )
                )}
            </div> 
        </div>
        </>
  )
}

export default Apartment 