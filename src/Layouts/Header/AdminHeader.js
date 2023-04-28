import React, { useEffect, useState  } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Message from '../../features/Message';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import img from '../../Assets/Images/admin.png'
import { AdminToken } from '../../features/Token';
import jwt_decode from 'jwt-decode';



function classNames(...classes) {
  return classes.filter(Boolean).join('')
}

const AdminHeader = () => {
  const PageRoutes = [
    {
      name:"Merchant",
      to:"/auth/admin/merchants"
    },{
      name:"Property",
      to:'/auth/admin/property'
    },{
      name:"Leads",
      to:'/auth/admin/leads'
    },
  ] 
  
  const navigate = useNavigate()
  const [message, setMessage] = useState({ message:'', type:false })
  const [dropdownIcon,setDropdownIcon]=useState(false)
  const [decodeData,setDecodeData]=useState()

  const DropdownIconHandler=()=>{
    if(dropdownIcon===true){
      setDropdownIcon(false)
    }else{
      setDropdownIcon(true)
    }
  }

  const LogoutHandler = () => {
    window.localStorage.removeItem('admin-token')
    setMessage({ message: 'Logout Successfully', type:true })
    setTimeout(() => {
      navigate('/auth/admin/login')
      setMessage(false)
    }, 2000);
  }

  useEffect(() => {
    if(AdminToken()){
      let decodeData = jwt_decode(AdminToken())
      setDecodeData(decodeData)
    }
  }, [AdminToken()])


  return (
        <>
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded shadow-lg ">
          <div className="container flex flex-wrap items-center justify-between mx-auto ">
            <a href="#" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap">Logo</span>
            </a> 
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
            <div className="flex items-center md:order-2 relative">
                <button type="button" onClick={DropdownIconHandler} className="show dropdown-toggle text-gray-900 text-sm leading-10 pr-4 pl-0 h-16 flex items-center">
                  <span className="mr-1 relative inline-flex	items-center">
                      <img className="rounded-full w-10 h-10 border p-0.5" src={img} width={31} alt="Ryan Taylor" />
                      <div className="ml-2">
                        <h6 className='text-sm font-medium'>{!decodeData?null:decodeData.user.name.charAt(0).toUpperCase() + decodeData.user.name.slice(1)}</h6>
                        <p className="mb-0 leading-5 text-xs font-medium text-gray-400">admin</p>
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
                        <p className="mb-0 text-gray-500">admin</p>
                      </div>
                    </div>
                    <NavLink className="flex items-center border border-t clear-both font-normal text-inherit decoration-0 bg-transparent	border-0 text-cyan-800 w-full pl-3 pr-4 py-2 hover:bg-orange-500 hover:text-white" ><span><i className="fa-solid fa-user fa-sm"></i></span>&nbsp; Profile</NavLink>
                    <NavLink to="/auth/admin/change-password" className="flex items-center border border-t clear-both font-normal text-inherit decoration-0 bg-transparent	border-0 text-cyan-800 w-full pl-3 pr-4 py-2 hover:bg-orange-500 hover:text-white" ><span><i className="fa-solid fa-unlock fa-sm"></i></span>&nbsp; Change Password</NavLink>
                    <button onClick={LogoutHandler} className=" flex items-center border border-t clear-both font-normal text-inherit decoration-0 bg-transparent	border-0 text-cyan-800 w-full pl-3 pr-4 py-2 hover:bg-orange-500 hover:text-white"><span><i className="fa-solid fa-power-off fa-sm"></i></span>&nbsp; Logout</button>
                  </div>
                  :null}
                </div>
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                  {PageRoutes.map((data)=>{
                    return <li>
                    <NavLink to={data.to} isActive className={({ isActive }) => !isActive ? "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      :"block px-4 py-2 text-sm text-gray-700 bg-gray-100 border-b-2 border-orange-500"}>{data.name}</NavLink>
                  </li>
                  })}
                </ul>
              </div>
                <div className="flex items-center md:order-2 lg:hidden">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        <i className="fa-solid fa-bars"></i>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute  right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {PageRoutes.map((data)=>{
                            return <Menu.Item>
                                  {({ active }) => (
                                    <NavLink 
                                      to={data.to}
                                      className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                     {data.name}
                                    </NavLink>
                                  )}
                                </Menu.Item>
                              })}
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={LogoutHandler}
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div> 
            </div>
          </nav>
        {message.type === true ?
            <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg' />
            : null}
          <Outlet />
        </>
        )
}

        export default AdminHeader;