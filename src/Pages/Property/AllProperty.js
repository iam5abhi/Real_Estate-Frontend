import React, { useState, useEffect } from 'react'
import { authFetch } from '../../Middleware/axios/intance'
import Message from '../../features/Message'
import { useNavigate } from 'react-router-dom'

const AllProperty = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState({ message: '', type: '' })
    const [propertyData, setPropertyData] = useState()

    const GetPropertyData = async () => {
        try {
            const resp = await authFetch('/');
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
        <div className="px-2 py-4 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-3 gap-4 rounded px-6 py-6">
                {!propertyData?null:propertyData.map(datas=>(
                    <div className="text-center">
                    <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{datas.PropertId.project_name}</h5>
                        <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">{datas.PropertId.location}</h5>
                        <div className='flex space-x-10 ml-2 mb-4'>
                        <h5 className="text-lg tracking-tight text-gray-600">{datas.propertytype}</h5>
                        <h5 className="text-lg tracking-tight text-gray-600">{datas.propertyname}</h5>
                        <h5 className="text-lg tracking-tight text-gray-600">{datas.propertybhk}</h5>
                        </div>
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

export default AllProperty;