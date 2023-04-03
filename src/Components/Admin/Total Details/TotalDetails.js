import React from 'react';

const TotalDetails = ({active,inactive,total}) => {
  return (
        <>
        <div className=" px-2 py-4 max-w-screen-lg mx-auto">
            <div className="grid grid-cols-3 gap-4 border border-gray-300/75 rounded px-6  py-6 bg-white shadow">
                <div className="text-center">
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">TOTAL</h5>
                    <p className="font-normal text-gray-700">{total}</p>
                </a>
                </div>
                <div className="text-center">
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">ACTIVE</h5>
                    <p className="font-normal text-gray-700">{active}</p>
                </a>
                </div>
                <div className="text-center">
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">INACTIVE</h5>
                    <p className="font-normal text-gray-700">{inactive}</p>
                </a>
                </div>
            </div> 
        </div>
    </>
  )
}

export default TotalDetails;