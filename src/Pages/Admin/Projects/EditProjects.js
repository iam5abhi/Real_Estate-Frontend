import React,{useState,useEffect} from 'react'
import AdminHeader from '../../../Layouts/Header/AdminHeader'
import Message from '../../../features/Message'
import { authFetch } from '../../../Middleware/axios/intance'
import { useNavigate, useParams } from 'react-router-dom'
import MultiRangeSlider from "multi-range-slider-react";

const EditProjects = () => {
  const {id} = useParams()
  const navigate = useNavigate()
    const [message,setMessage]=useState({message:'',type:''})
    const [formData,setFormData]=useState({project_name:'',property_name:'',property_type:''})
    const [propertyData,setPropertyData]=useState()
    const [bhkType,setBhkType]=useState([]) 
    const [minValue, set_minValue] = useState(5);
    const [maxValue, set_maxValue] = useState(75);

    let locationFilter = !propertyData?null:propertyData.find(data => data._id==formData.project_name)
    let bhkChecked = bhkType.find((data)=>{ return data===""})
    
    const OnChangeHandler=(event)=>{
        setFormData((pre)=>({
            ...pre,
            [event.target.name]:event.target.value
        }))
    }

    const BHKHandler=(event)=>{
      if(bhkType.includes(event.target.value)){
        bhkType.splice(bhkType.indexOf(event.target.value), 1)
      }else{
        setBhkType([...bhkType,event.target.value])
      }
    }

    const handleInput = (e) => {
      set_minValue(e.minValue);
      set_maxValue(e.maxValue);
    };

    const EditProjectSubmit = async (event)=>{
      event.preventDefault();
      try {
        await authFetch.post('/api/admin/project',{PropertId:formData.project_name, 
        propertyname:formData.property_name, propertytype:formData.property_type, price:`${minValue}-${maxValue}`,
        propertybhk:bhkType});
        setMessage({message:"Add Property Successfully",type:true})
        setTimeout(() => {
          navigate('/auth/admin/projects')
          setMessage({message:'',type:''})
        },1000);
      } catch (error) {
        setMessage({message:error,type:false})
      }
    }

    const GetPropertyData = async () => {
      try {
          const resp = await authFetch(`/api/admin/property`);
          setPropertyData(resp.data.data)
      } catch (error) {
          setMessage({ message: error, type: false })
      }
  }

  const GetProjectData = async () => {
    try {
        const resp = await authFetch(`/api/admin/project/${id}`);
        setFormData({project_name:resp.data.data.PropertId,property_name:resp.data.data.propertyname,property_type:resp.data.data.propertytype})
        setBhkType(resp.data.data.propertybhk)
        let rangeData = resp.data.data.price.split("-")
        console.log(rangeData,"rangeData")
        set_minValue(rangeData[0])
        set_maxValue(rangeData[1])
      } catch (error) {
        setMessage({ message: error, type: false })
    }
}

  useEffect(() => {
      GetPropertyData()
      GetProjectData()
  }, [])

  return (
        <>
        <AdminHeader />
        <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8 ">
            <div className="w-full max-w-lg space-y-8 shadow-2xl rounded-lg px-5 py-5 bg-white">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Edit Project</h2>
              </div>
              <form onSubmit={EditProjectSubmit}>
                <div className='mt-3 '>
                 <div className='mb-2'>
                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name <span class="text-red-600">*</span></label>
                   <select id="Status" onChange={OnChangeHandler} value={formData.project_name} name='project_name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-3" >
                      <option value='' >Choose Project Name</option>
                      {!propertyData?null:propertyData.map((data)=>{
                        return <option value={data._id}>{data.project_name}</option>
                      })}
                    </select>
                 </div>
                 {/* {formData.project_name?
                 <div className='mb-2'>
                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location <span class="text-red-600">*</span></label>
                   <input type="text" name='email' disabled value={locationFilter.location} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 disabled:opacity-75" placeholder='Enter Email' />
                 </div>
                 :null} */}
                 </div>
                 <div className='mb-2'>
                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Property Name <span class="text-red-600">*</span></label>
                   <input type="text" name='property_name' onChange={OnChangeHandler} value={formData.property_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 disabled:opacity-75" placeholder='Enter Property Name' />
                 </div>
                 <div className='mb-2'>
                    <h1 className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Property Type <span class="text-red-600">*</span></h1>
                    <input type="radio" name='property_type' checked={formData.property_type==='residential'} onChange={OnChangeHandler} value='residential' id="description" className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                    <label className="text-sm font-medium text-gray-900 dark:text-white"> Residential </label>
                </div> 
                <div className='mb-3'>
                        <h1 className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">BHK Type <span class="text-red-600">*</span></h1>
                          <input type="checkbox" value='2bhk' checked={bhkChecked==='2bhk'} onChange={BHKHandler} className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                          <label className="text-sm font-medium text-gray-900 dark:text-white"> 2bhk </label>
                          <input type="checkbox" value='3bhk' checked={bhkChecked==='3bhk'} onChange={BHKHandler} className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                          <label className="text-sm font-medium text-gray-900 dark:text-white"> 3bhk </label>
                          <input type="checkbox" value='4bhk' checked={bhkChecked==='4bhk'} onChange={BHKHandler} className="bg-orange-50 border border-gray-300 text-orange-600 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500" placeholder='Enter Description' required />
                          <label className="text-sm font-medium text-gray-900 dark:text-white"> 4bhk </label>
                </div>
                <div className='mt-1 mb-5'>
                  <MultiRangeSlider style={{border:'none',boxShadow:'none',padding:'15px 10px'}} min={0} label='false' ruler='false' max={100} step={5} minValue={minValue} maxValue={maxValue} onInput={(e) => {handleInput(e)}} />
                </div>
                 {message.type !==''?message.type===false?
                  <Message message={message.message} css='flex p-4 mb-5 -mt-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                  :
                  <Message message={message.message} css='flex p-4 mb-5 -mt-3 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                :null}
                 <div className='grid justify-items-center'>
                   <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400
                     focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 mb-2 focus:outline-none">Submit</button>
                 </div>
              </form>
            </div>
          </div>
    </>
  )
}

export default EditProjects