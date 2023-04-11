import React, { useState, useEffect } from 'react'
import AdminHeader from '../../../Layouts/Header/AdminHeader'
import { authFetch } from '../../../Middleware/axios/intance'
import Message from '../../../features/Message'
import PropertyAddModal from '../../../Components/Admin/Property/PropertyAddModal'
import PropertyStatusModal from '../../../Components/Admin/Property/PropertyStatusModal'


const Property = () => {
    const [modals, setModals] = useState({ type: '', isOpen: false })
    const [message, setMessage] = useState({ message: '', type: '' })
    const [propertyData, setPropertyData] = useState()
    const [Id, setId] = useState()

    const ModalOpenFuntion = (types, id) => {
        setId(id)
        setModals({ ...modals, type: types, isOpen: true });
    }

    const GetPropertyData = async () => {
        try {
            const resp = await authFetch('/api/admin/project');
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
            <AdminHeader />
            {message.type !== '' ? message.type === false ?
                <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg' />
                :
                <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
                : null}
            <div className="container mx-auto px-4 sm:px-8 mt-5">
                <div className="py-8">
                    <div className='flex justify-between'>
                        <h2 className="text-2xl font-semibold leading-tight">Properties</h2>
                        <button type="button" onClick={() => ModalOpenFuntion("add")} className="text-white text-md bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 rounded-full px-2.5 py-1.5">
                            <i class="fa-solid fa-plus fa-sm"></i> Add Property</button>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <i className="fa-solid fa-thumbtack"></i> Serial No
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <i className="fa-solid fa-user"></i> Title
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <i className="fa-solid fa-envelope"></i> Description
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <i class="fa-solid fa-chart-line"></i> Status
                                        </th>
                                        <th className="py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <i className="fa-solid fa-location-arrow"></i> Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!propertyData ? null : propertyData.map((data) => {
                                        return <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap font-semibold">{data.Pid}. </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{data.title}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{data.description}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button className={`rounded-full px-3 py-1.5 font-semibold shadow ${data.status==="active"?"bg-green-200/75 text-green-900":"bg-red-200/75 text-red-900"}`}>{data.status}</button>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <button type="button" onClick={()=>ModalOpenFuntion("status",data._id)} className="px-3 py-1.5 font-semibold inset-0 bg-orange-200 rounded-full shadow">
                                                    <span className="relative"><i className="fa-regular fa-circle-check fa-sm"></i> Status</span>
                                                </button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {modals.type === "add" ? <PropertyAddModal setOpen={setModals} open={modals} GetPropertyData={GetPropertyData} />
                : modals.type === "status" ? <PropertyStatusModal setOpen={setModals} open={modals} id={Id} GetPropertyData={GetPropertyData} /> : null}
        </>
    )
}

export default Property