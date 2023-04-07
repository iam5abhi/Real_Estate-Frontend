import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import MerchantAddModal from './MerchantAddModal'
import MerchantEditModal from './MerchantEditModal';
import MerchantStatusModal from './MerchantStatusModal';
import Subscription from './Subscription';
import { getfunction } from '../../../features/FilterStatus';
import TotalDetails from '../Total Details/TotalDetails';
import AdminHeader from '../../../Layouts/Header/AdminHeader';
import { authFetch } from "../../../Middleware/axios/intance"
import { customStyles } from '../../../features/DataTable'
import Message from '../../../features/Message';


const Merchant = () => {
    const [modals,setModals]=useState({type:'',isOpen:false})
    const [message,setMessage]=useState({message:'',type:''})
    const [searchText, setSearchText] = React.useState('');
    const [merchantData,setMerchantData]=React.useState()
    const [pending, setPending] = useState(true);
    const [statusData,setStatusData]=useState({active:'',inactive:'',total:''})
    const [Id,setId]=React.useState()

    const MerchantComponent=()=>{
        return(
            <div className='flex justify-between mt-3 -mb-7'>
            <h1 className='font-semibold'>Merchants</h1>
            <div className='grid grid-cols-2 gap-4'>
              <div>
              <input type='text' onChange={(e)=>setSearchText(e.target.value)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-orange-500 focus:border-orange-500 block w-full p-3" placeholder='Search' />  &nbsp;
                </div>
                <div>
                <button type="button" onClick={()=>ModalOpenFuntion("add")} className="text-white text-lg bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 rounded-full px-4 py-2">
                  <i class="fa-solid fa-plus"></i> Add Merchant</button>
                </div>
            </div>
        </div>
        )
    }

    const columns = [
        { name:  'Sr.', selector: (row,index) => index+1, width:"9rem"},
        { name: 'Name', selector: row => row.name.charAt(0).toUpperCase() + row.name.slice(1), width:"15rem" },
        { name: 'Email', selector: row => row.email, },
        { name: 'phone Number', selector: row =>row.phoneNumber,},
        { name: 'Status', selector: row => row.status === 'active'?<span className='bg-green-100 p-2 px-4 rounded-full text-green-600'>{row.status}</span>:<span className='bg-red-100 p-2 px-4 rounded-full text-red-600'>{row.status}</span> },
        { name: 'Action', selector: row =><div>
        <button data-tooltip="Edit Merchant Detail" onClick={()=>ModalOpenFuntion("edit",row._id)} type="button" className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-orange-300 font-medium text-sm  mr-2 mb-2">
        <i className="fa-solid fa-pen-to-square hover:scale-[1.02] transition-transform" /></button>
        <button data-tooltip="Change Merchant Status" onClick={()=>ModalOpenFuntion("status",row._id)} type="button" className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-orange-300 font-medium text-sm  mr-2 mb-2">
        <i className="fa-regular fa-circle-check" /></button>
        <button data-tooltip="Subscription" onClick={()=>ModalOpenFuntion("subscription",row._id)} type="button" className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-orange-300 font-medium text-sm  mr-2 mb-2">
        <i className="fa-solid fa-dollar-sign" /></button>
        </div>, width:"12rem" },
    ];

    const ModalOpenFuntion=(types,id)=>{
        setId(id)
        setModals({...modals,type:types,isOpen:true});
    }

    const GetMerchantData = async ()=>{
        try {
          const resp = await authFetch('/api/admin/merchant');
          setMerchantData(resp.data.data)
          let active = getfunction(resp.data.data,'active')
          let inactive = getfunction(resp.data.data,'inactive') 
          setStatusData({active:active.length,inactive:inactive.length,total:resp.data.data.length})
          setPending(false);
        } catch (error) {
          setMessage({message:error,type:false})
        }
    }
    
    React.useEffect(() => {
      GetMerchantData()
    },[])
    
  return (
        <>
        <AdminHeader />
        {message.type !==''?message.type===false?
        <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'/>
        :
        <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
        :null}
        <TotalDetails active={statusData.active} inactive={statusData.inactive} total={statusData.total}/>
        <div className="max-w-screen mx-auto mt-10 overflow-auto">
          <div className="container mx-auto">
             <div>
                <div className="flex justify-between items-center px-1 bg-white">
                    <div className=" text-sm text-gray-500">
                        <h2 className=" text-lg font-semibold text-orange-500 mb-4">Merchants</h2>
                    </div>  
                </div>
                <hr />
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <DataTable
                    columns={columns}
                    data={!merchantData?[]:merchantData.filter((item) => {
                        if (searchText === "") { return item;} 
                        else if (item.status.toLowerCase().includes(searchText.toLowerCase())){return item;}
                        else if (item.phoneNumber.toString().includes(searchText)){return item;}
                        else if (item.name.toLowerCase().includes(searchText.toLowerCase())){return item;}
                        else if (item.email.toLowerCase().includes(searchText.toLowerCase())){return item;}  
                    })}
                    customStyles={customStyles}
                    progressPending={pending}
                    pagination 
                    title={MerchantComponent()}
                  />
                </div>
             </div>
         </div>
        </div>
        {modals.type==="add"?<MerchantAddModal setOpen={setModals} open={modals} GetMerchantData={GetMerchantData} />
        :modals.type==="edit"?<MerchantEditModal setOpen={setModals} open={modals} id={Id} GetMerchantData={GetMerchantData} />
        :modals.type==="subscription"?<Subscription setOpen={setModals} open={modals} id={Id} GetMerchantData={GetMerchantData} />
        :modals.type==="status"?<MerchantStatusModal setOpen={setModals} open={modals} id={Id} GetMerchantData={GetMerchantData}/>:null}
        </>
  )
}

export default Merchant