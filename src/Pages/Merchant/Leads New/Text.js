import React from 'react';
import { NavLink } from 'react-router-dom';

const Routes = [
    {
      name:"General",
      to:'1'
    },{
      name:"Products",
      to:'2'
    },{
      name:"History",
      to:'3'
    },  
  ]

const Text = () => {
    
  return (
    <>
    <div className='mt-5'>
       <nav className="bg-gray-200 border-gray-200 px-2 sm:px-4 py-1 rounded shadow-lg ">
            <div className="container flex flex-wrap items-center justify-between mx-auto ">
              <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 border border-gray-100 rounded-lg bg-gray-200 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-200">
                    {Routes.map((data)=>{
                        return <li>
                            <NavLink to={data.to} isActive className={({ isActive }) => !isActive ? "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            :"block px-2 py-2 text-sm text-orange-500 border-b-2 border-orange-400"}>{data.name}</NavLink>
                        </li>
                    })}
                </ul>
              </div>
            </div>
        </nav> 
        <div className="container mx-auto px-4 sm:px-8 mt-5">
                <div className="py-8">
                    <div className='flex justify-between'>
                        <h2 className="text-2xl font-semibold leading-tight">Leads</h2>
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
                                    <tr>
                                        <td className="pl-14 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-blue-500 whitespace-no-wrap cursor-pointer">Bestech Park View</p>
                                        </td>
                                        <td className="px-4 py-5 border-b border-gray-200 text-center bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">Sandeep Sharma</p>
                                        </td>
                                        <td className="px-4 py-5 border-b border-gray-200 text-center bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">Sandeep@gmail.com</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center space-x-2">
                                            <p className="text-gray-900 whitespace-no-wrap">8547968547</p>
                                        </td>
                                    </tr>   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </>
  )
}

export default Text;