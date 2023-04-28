import React, { useState, useEffect } from 'react'
import { authFetch } from '../../../Middleware/axios/intance';
import { useParams } from 'react-router-dom';
import AdminHeader from '../../../Layouts/Header/AdminHeader';
import image from '../../../Assets/Images/frontbanner3.jpg'
import codesoftic from '../../../Assets/Images/footer logo.png'

const SinglePropertieDetail = () => {
    const {id} = useParams()
    const [propertyData, setPropertyData] = useState()


    const getSinglePropertiesData = async () => {
        try {
            const resp = await authFetch(`http://localhost:7000/api/admin/project/${id}`);
            setPropertyData(resp.data.data)
        } catch (error) {
        }
    }

    useEffect(() => {
        getSinglePropertiesData()
    }, []);
  return (
    <>
    <AdminHeader />
    {/* Text Header */}
    <header className="w-full container mx-auto rounded-b">
                <section>
                    <a href="#">
                        <img src={image} />
                    </a>
                </section>
            </header>
        {/*-----------Main container*/}
    <div className="container mx-auto flex flex-wrap py-6">
            {/*Main section */}
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
                <article className="flex flex-col shadow my-4">
                    <div className="bg-white flex flex-col justify-start p-6">
                        <a href="#" className="text-3xl text-gray-800 font-bold pb-4">{!propertyData?null:propertyData.title}</a>
                        <p href="#" className="text-sm pb-1">
                            <a href="#" className="font-semibold">{!propertyData?null:propertyData.title}</a>
                        </p>
                        <p href="#" className="text-sm pb-3">
                            <a href="#" className="font-normal text-gray-500 "><i className="fa-solid fa-location-dot" />&nbsp;Sector 65,
                                Mohali</a>
                        </p>
                        <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu
                            iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                    </div>
                </article>
                <article className="flex flex-col shadow my-4">
                    <div className="bg-white flex flex-col justify-start p-6">
                        <a href="#" className="text-3xl  text-gray-800 font-bold  pb-4">About </a>
                        <p href="#" className="text-sm pb-3">
                            <a href="#" className="font-semibold hover:text-gray-800">By IREO</a>
                        </p>
                        <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu
                            iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                    </div>
                </article>
                <article className="flex flex-col shadow my-4">
                    <div className="bg-white flex flex-col justify-start p-6">
                        <a href="#" className="text-3xl text-gray-800 font-bold pb-4">Download Broucher</a>
                        <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu
                            iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                    </div>
                </article>
                <article className="flex flex-col shadow my-4">
                    <div className="bg-white flex flex-col justify-start p-6">
                        <a href="#" className="text-3xl text-gray-800 font-bold pb-4">Rise Price List</a>
                        <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu
                            iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                    </div>
                </article>
                <article className="flex flex-col shadow my-4">
                    <div className="bg-white flex flex-col justify-start p-6">
                        <a href="#" className="text-3xl text-gray-800 font-bold  pb-4">Amenties</a>
                        <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu
                            iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                    </div>
                </article>
                <article className="flex flex-col shadow my-4">
                    <div className="flex flex-col items-center py-12">
                        <a className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
                            Middle Banner
                        </a>
                    </div>
                </article>
                <article className="flex flex-col shadow my-4">
                    <div className="bg-white flex flex-col justify-start p-6">
                        <a href="#" className="text-3xl text-gray-800 font-bold pb-4">About Developers</a>
                        <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu
                            iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                    </div>
                </article>
                <article className="flex flex-col shadow my-4">
                    <div className="bg-white flex flex-col justify-start p-6">
                        <a href="#" className="text-3xl text-gray-800 font-bold  pb-4">Top Advertisers</a>
                        <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu
                            iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                    </div>
                </article>
            </section>
            {/*Main section end */}
            {/* Sidebar Section */}
            {/*----Sidebar section end*/}
        </div>
        {/*----------Main container end*/}
        {/*---------Footer Start*/}
        <footer className="w-full border-t">
            <section className="footer__main bg-gray-200">
                <div className="flex justify-center bg-gray-200...">
                    <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6 ">
                        <a href="#" className=" px-3">Home</a>
                        <a href="#" className=" px-3">About</a>
                        <a href="#" className=" px-3">Services</a>
                        <a href="#" className=" px-3">Contact</a>
                    </div>
                </div>
            </section>
            <section className="footer__copyright bg-gray-800 p-2 ">
                <div className="text-center">
                    <div>
                        <a href>
                            <span className="text-white text-xs whitespace-nowrap">
                                All Rights Reserved. © Copyright 2023 Codesoftic Tech Private Limited.
                            </span>
                        </a>
                    </div>
                    <div>
                        <a href="https://codesoftic.com/">
                            <span className="text-white text-xs">Developed By</span>
                            <img src={codesoftic} className="w-24 block mx-auto " />
                        </a>
                    </div>
                </div>
            </section>
        </footer>
</>
  )
}

export default SinglePropertieDetail