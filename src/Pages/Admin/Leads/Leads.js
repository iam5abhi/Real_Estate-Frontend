import React, { useState, useEffect } from 'react'
import AdminHeader from '../../../Layouts/Header/AdminHeader'
import { authFetch } from '../../../Middleware/axios/intance'
import Message from '../../../features/Message'
import { useNavigate } from 'react-router-dom'


const Leads = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = React.useState('');
    const [message, setMessage] = useState({ message: '', type: '' })
    const [leadData, setLeadData] = useState()
    const [displayLead, setDisplayLead] = useState([])          


    const SearchProperties = (event) => {
        const filterData = leadData.filter(item => {
        if (event.target.value === "") return leadData
            return item.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setSearchText(event.target.value)
        setDisplayLead(filterData)
    }

    const GetPropertyData = async () => {
        try {
            const resp = await authFetch('/api/admin/get-all-leads');
            setLeadData(resp.data)
            setDisplayLead(resp.data)
        } catch (error) {
            setMessage({ message: error, type: false })
        }
    }

    useEffect(() => {
        GetPropertyData()
    }, [])

    return (
        <>
            <AdminHeader />
            {message.type !== '' ? message.type === false ?
                <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg' />
                :
                <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
                : null}
            <div className="container mx-auto px-4 sm:px-8 mt-5">
                <div className="py-8">
                    <div className='flex justify-between'>
                        <h2 className="text-2xl font-semibold leading-tight">Leads</h2>
                        <div className='flex space-x-2'>
                            <input type='text' onChange={SearchProperties} value={searchText}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-orange-500 focus:border-orange-500 block p-2" placeholder='Search' />  &nbsp;
                        </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="pl-14 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <i className="fa-solid fa-user"></i> Property Type
                                        </th>
                                        <th className="py-3 border-b-2 text-center border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <i className="fa-solid fa-user"></i> Client Name
                                        </th>
                                        <th className="px-4 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <i className="fa-solid fa-envelope"></i> Email
                                        </th>
                                        <th className="py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <i className="fa-solid fa-phone"></i> Phone Number
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!displayLead ? null : displayLead.map((data) => {
                                       return data.Project.map((item)=>{
                                            return <tr>
                                            <td className="pl-14 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p onClick={ ()=>navigate(`/auth/admin/property-detail/${item._id}`) } className="text-blue-500 whitespace-no-wrap cursor-pointer">{item.propertyname}</p>
                                            </td>
                                            <td className="px-4 py-5 border-b border-gray-200 text-center bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{data.name}</p>
                                            </td>
                                            <td className="px-4 py-5 border-b border-gray-200 text-center bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{data.email}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center space-x-2">
                                                <p className="text-gray-900 whitespace-no-wrap">{data.phoneNumber}</p>
                                            </td>
                                            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center space-x-2">
                                                <button type="button" onClick={() => ModalOpenFuntion("status", data._id)} className="px-3 py-1.5 font-semibold bg-orange-200 rounded-full shadow">
                                                    <span className="relative"><i className="fa-regular fa-circle-check fa-sm"></i> Status</span>
                                                </button>
                                                <button type="button" onClick={() => navigate(`/property-details/${data._id}`)} className="px-3 py-1.5 font-semibold inset-0 bg-orange-200 rounded-full shadow">
                                                    <span className="relative"><i className="fa-solid fa-link fa-sm"></i> Url</span>
                                                </button>
                                            </td> */}
                                       </tr>   
                                        })
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Leads