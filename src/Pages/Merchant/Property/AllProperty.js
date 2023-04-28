import React, { useState, useEffect } from 'react'
import { authFetch } from '../../../Middleware/axios/intance'
import Message from '../../../features/Message'
import { useNavigate } from 'react-router-dom'

const AllProperty = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState({ message: '', type: '' })
    const [propertyData, setPropertyData] = useState()


    const SubscriptionHandler = async (id) => {
        try {
            const resp = await authFetch.patch(`/api/merchant/subscribe-product/${id}`);
            setMessage({ message: "Applied Successfully", type: true })
            GetPropertyData()
        } catch (error) {
            setMessage({ message: error, type: false })
        }
    }

    const GetPropertyData = async () => {
        try {
            const resp = await authFetch.get('/api/merchant/getallproduct');
            setPropertyData(resp.data.data)
            setTimeout(() => {
            setMessage({ message:'', type:'' })
            }, 1000);
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
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{datas.title}</h5>
                        <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">{datas.description}</h5>
                        {!datas.MerchantId?
                        <button type="button" onClick={()=>SubscriptionHandler(datas._id)} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Subscribe</button>
                        :<button type="button" className="text-white text-end bg-green-600 hover:bg-green-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Applied</button>}
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