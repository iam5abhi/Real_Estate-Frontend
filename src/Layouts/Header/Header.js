import React, { useState } from 'react';
import {NavLink,Outlet, useLocation} from 'react-router-dom';
import { Token } from '../../features/Token'
import Message from '../../features/Message';
import { useNavigate } from 'react-router-dom';
import img from "../../Assets/Images/merchant.jpg"
import jwt_decode from "jwt-decode";


const MentorRoutes = [
    {
      name:"Project",
      to:'/auth/mentor/upload-project'
    },{
      name:"Request",
      to:'/auth/mentor/request'
    },{
      name:"My Project",
      to:'/auth/mentor/my-projects' 
    },
  ]

const EnterprisesRoutes = [
  {
    name:"Upload Project",
    to:"/auth/enterprises/upload-project"
  },{
    name:"Projects",
    to:"/auth/enterprises/projects"
  },{
    name:"My Project",
    to:'/auth/enterprises/my-projects' 
  },
]

const Header = () => {
  const UrlName =useLocation()
  const navigate =useNavigate()
  const [message,setMessage]=useState({message:'',type:false})
  const [dropdownIcon,setDropdownIcon]=useState(false)
  const [decodeData,setDecodeData]=useState()

  const DropdownIconHandler=()=>{
    if(dropdownIcon===true){
      setDropdownIcon(false)
    }else{
      setDropdownIcon(true)
    }
  }
  const LogoutHandler =()=>{
    window.localStorage.removeItem('token')
    setMessage({message:'Logout Successfully',type:true})
    setTimeout(() => {
      setDecodeData()
      navigate('/login')
      setMessage(false)
  },2000);
  }
  
  React.useEffect(() => {
    if(Token()){
      let decode = jwt_decode(Token())
      setDecodeData(decode)
    }
    },[])
  

  return (
        <>
        {UrlName.pathname !=="/"?
         <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-lg ">
            <div className="container flex flex-wrap items-center justify-between mx-auto ">
              <a href="#" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
              </a>
               {/* Dropdown menu */}
               {!Token()?null:
              <div className="flex items-center md:order-2 relative">
              <button type="button" onClick={DropdownIconHandler} className="show dropdown-toggle text-gray-900 text-sm leading-10 pr-4 pl-0 h-16 flex items-center">
                <span className="mr-1 relative inline-flex	items-center">
                    <img className="rounded-full w-10 h-10 border p-0.5" src={img} width={31} alt="Ryan Taylor" />
                    <div className="ml-2">
                      <h6 className='text-sm font-medium'>{!decodeData?null:decodeData.user.name.charAt(0).toUpperCase() + decodeData.user.name.slice(1)}</h6>
                      <p className="mb-0 leading-5 text-xs font-medium text-gray-400">merchant</p>
                    </div>
                    <div className='ml-2'>
                      {dropdownIcon===false?<i className="fa-solid fa-caret-down"></i>
                      :<i className=" fa-solid fa-caret-down fa-rotate-180"></i>
                      } 
                    </div>
                  </span>
              </button>
              {/* Dropdown menu */}
              {dropdownIcon===true?
              <div className="text-sm w-52 p-0 border rounded-md origin-top-left shadow-inherit bg-white z-50 m-0 text-left	bg-clip-padding	list-none"
                style={{position: 'absolute', inset:'0px auto auto -49px', margin: 0, transform: 'translate(0px, 62px)'}}> 
                  <div className="bg-gray-100/50 flex pl-2.5 pr-3.5 py-2">
                    <div className="w-10 h-10 relative inline-block	">
                      <img src={img} alt="User Image" className="rounded-full h-full	w-full object-cover	" />
                    </div>
                    <div className="ml-2.5">
                      <h6 className='mb-0.5 font-medium leading-5 text-base	'>{!decodeData?null:decodeData.user.name.charAt(0).toUpperCase() + decodeData.user.name.slice(1)}</h6>
                      <p className="mb-0 text-gray-500">merchant</p>
                    </div>
                  </div>
                  <NavLink className="flex items-center border border-t clear-both font-normal text-inherit decoration-0 bg-transparent	border-0 text-cyan-800 w-full pl-3 pr-4 py-2 hover:bg-orange-500 hover:text-white" ><span><i className="fa-solid fa-user fa-sm"></i></span>&nbsp; Profile</NavLink>
                  <NavLink to="/auth/dealer/change-password" className="flex items-center border border-t clear-both font-normal text-inherit decoration-0 bg-transparent	border-0 text-cyan-800 w-full pl-3 pr-4 py-2 hover:bg-orange-500 hover:text-white" ><span><i className="fa-solid fa-unlock fa-sm"></i></span>&nbsp; Change Password</NavLink>
                  <button onClick={LogoutHandler} className=" flex items-center border border-t clear-both font-normal text-inherit decoration-0 bg-transparent	border-0 text-cyan-800 w-full pl-3 pr-4 py-2 hover:bg-orange-500 hover:text-white"><span><i className="fa-solid fa-power-off fa-sm"></i></span>&nbsp; Logout</button>
                </div>
                :null}
              </div>
              }
              <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {!Token()?
                    <>
                    {UrlName.pathname=="/login"?
                      <li>
                        <NavLink to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Register</NavLink>
                      </li> 
                      :
                      <li>
                        <NavLink to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</NavLink>
                      </li>
                    }
                    </>
                    :<>
                      <li>
                        <NavLink to="/auth/student" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><i className="fa-solid fa-gauge fa-2xl text-orange-500"></i></NavLink>
                      </li>
                    </>
                    }
                </ul>
              </div>
              
            </div>
        </nav>
        :null}
        {message.type === true?
        <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
        :null}
        <Outlet />
    </>
  )
}

export default Header;