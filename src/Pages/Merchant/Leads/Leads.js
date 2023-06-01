import React,{useEffect,useState} from 'react';
import { authFetch } from '../../../Middleware/axios/intance';

const Leads = () => {
    const [leadsData, setLeadsData] = useState()

    const GetLeadsData = async () => {
        try {
            const resp = await authFetch('/api/merchant/client-query-information');
            setLeadsData(resp.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetLeadsData()
    }, [])
    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">Leads</h2>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        <i className="fa-solid fa-location-arrow"></i> Property Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        <i className="fa-solid fa-user"></i> User Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        <i className="fa-solid fa-envelope"></i> User Email
                                    </th>
                                    <th className="py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        <i className="fa-solid fa-phone"></i> User Number
                                    </th>
                                    {/* <th className="py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        <i className="fa-solid fa-location-arrow"></i> Action
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {!leadsData?null:leadsData.map((data)=>{
                                    return data.Projects.map((item)=>{
                                        return <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-blue-500 font-semibold whitespace-no-wrap">{item.propertyname}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{data.name}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{data.email}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{data.phoneNumber}</p>
                                            </td>
                                            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <button type="button" className="px-3 py-1 font-semibold inset-0 bg-orange-200 rounded-full leading-tight">
                                                    <span className="relative"><i className="fa-solid fa-eye fa-xs"></i> View</span>
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
        </div>
    )
}

export default Leads