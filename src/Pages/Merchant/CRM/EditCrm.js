import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authFetch } from '../../../Middleware/axios/intance'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Message from '../../../features/Message';


const EditCrm = () => {
    const {id} = useParams()
    const animatedComponents = makeAnimated();
    const navigate = useNavigate()
    const [message,setMessage]=useState({message:'',type:''})
    const [formData, setFormData] = useState({name:'', email:'', phoneNumber:'', AlternatePhoneNumber:'', 
        leadOfSource:'', loan:'', buy:'', budget:'', desc:'', status:''
    })
    const [selectProperty, setSelectProperty] = useState([])
    const [propertyData, setPropertyData] = useState()
    const [profileStep, setProfileStep] = useState({
        step: 1, status: '', clear: ''
    })

    const PreviousHandler = () => {
        setProfileStep({ ...profileStep, step: profileStep.step - 1 })
    }

    const OnChangeHandler = (event) => {
        setFormData((pre) => ({
            ...pre,
            [event.target.name]: event.target.value
        }))
    }

    const PropertyChangeHandler =(event)=>{
        // if(selectProperty.includes(event.target.value)){
            // let index = selectProperty.indexOf(event.target.value)
            //             selectProperty.splice(index,1)
            //             console.log(index,"index")
            let filterData= selectProperty.filter(data=>data!=event.target.value)
            setSelectProperty(filterData)
        // }else{
            // setSelectProperty([...selectProperty,event.target.value])
        // }
    }

    const NextHandler = () => {
        setProfileStep({ ...profileStep, step: profileStep.step + 1, })
    }

    const FormSubmitHandler = async () => {
        try {
            const resp = await authFetch.patch(`/api/merchant/merchant-query/${id}`,{...formData,Property:"selectCategory"});
            setProfileStep({...profileStep,step:0,status:'complete',clear:resp.data.message})
            setMessage({message:"Edit Successfully",type:true})
            setTimeout(() => {
              navigate('/auth/dealer/crm')
            },1000);
          } catch (error) {
            console.log(error)
        }
    }

    const GetPropertyData = async () => {
        try {
            const resp = await authFetch('/api/admin/project');
            setPropertyData(resp.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const GetProjectData = async () => {
        try {
            const resp = await authFetch(`/api/merchant/merchant-query/${id}`);
            let newData = resp.data.find(data=> data)
            let property = newData.Project.map(data=> data._id)
            setSelectProperty(property)
            setFormData({name:newData.name, email:newData.email, phoneNumber:newData.phoneNumber, AlternatePhoneNumber:
            newData.AlternatePhoneNumber, leadOfSource:newData.leadOfSource,loan:newData.loan, buy:newData.buy, 
            budget:newData.budget, desc:newData.desc, status:newData.status})
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetPropertyData()
        GetProjectData()
    }, [])

    return (
        <>
            {message.type !==''?message.type===false?
            <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'/>
            :
            <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
            :null}
            <div className="max-w-3xl mx-auto px-4 py-10">
                {profileStep.status !== 'complete' ? <>
                    <div className="flex-1">
                        <div className="w-full">
                            <div className="flex">
                                <div onClick={()=>setProfileStep({ ...profileStep,step:1})} className="w-3/5 cursor-pointer">
                                    <div className="relative mb-2">
                                        <div className="w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center bg-green-500">
                                            <span className="text-center w-full text-white-600">
                                                <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                                    <path className="heroicon-ui" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm14 8V5H5v6h14zm0 2H5v6h14v-6zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-center md:text-base">Personal Details</div>
                                </div>
                                <div onClick={()=>setProfileStep({ ...profileStep,step:2})} className="w-3/5 cursor-pointer">
                                    <div className="relative mb-2">
                                        <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                <div className={`w-0 py-1 rounded ${profileStep.step>1?"bg-green-300":"bg-gray-300"}`} style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                        <div className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center ${profileStep.step>1?"bg-green-500 text-white":"bg-white border-2 border-gray-200"}`}>
                                            <span className={`text-center w-full ${profileStep.step>1?"text-white":"text-gray-600"}`}>
                                                <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                                    <path className="heroicon-ui" d="M19 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2zM9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-center md:text-base">Projects</div>
                                </div>
                                <div onClick={()=>setProfileStep({ ...profileStep,step:3})} className="w-3/5 cursor-pointer">
                                    <div className="relative mb-2">
                                        <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                <div className={`w-0 py-1 rounded ${profileStep.step>2?"bg-green-300":"bg-gray-300"}`} style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                        <div className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center ${profileStep.step>2?"bg-green-500 text-white":"bg-white border-2 border-gray-200"}`}>
                                            <span className={`text-center w-full ${profileStep.step>2?"text-white":"text-gray-600"}`}>
                                                <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                                    <path className="heroicon-ui" d="M19 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2zM9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-center md:text-base">Loan</div>
                                </div>
                                <div onClick={()=>setProfileStep({ ...profileStep,step:4})} className="w-3/5 cursor-pointer">
                                    <div className="relative mb-2">
                                    <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                <div className={`w-0 py-1 rounded ${profileStep.step>3?"bg-green-300":"bg-gray-300"}`} style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                        <div className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center ${profileStep.step>3?"bg-green-500 text-white":"bg-white border-2 border-gray-200"}`}>
                                            <span className={`text-center w-full ${profileStep.step>3?"text-white":"text-gray-600"}`}>
                                                <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-center md:text-base">Others</div>
                                </div>
                            </div>
                        </div>
                        {profileStep.step === 1 ? <>
                            <div className="py-8">
                                <div >
                                    <div className="mb-2">
                                        <label htmlFor="firstname" className="font-bold mb-1 text-gray-700 block">Name <span class="text-red-600">*</span></label>
                                        <input type="text" name='name' value={formData.name} onChange={OnChangeHandler} className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 focus:shadow-outline font-medium" placeholder="Enter your name..." />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">Email <span class="text-red-600">*</span></label>
                                        <input type="email" name='email' value={formData.email} onChange={OnChangeHandler} className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 focus:shadow-outline text-gray-600 font-medium" placeholder="Enter your email address..." />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">Phone Number <span class="text-red-600">*</span></label>
                                        <input type="text" name='phoneNumber' value={formData.phoneNumber} onChange={OnChangeHandler} className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 focus:shadow-outline text-gray-600 font-medium" placeholder="Enter your phone number..." />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">Alternate Phone Number (Optional)</label>
                                        <input type="text" name='AlternatePhoneNumber' value={formData.AlternatePhoneNumber} onChange={OnChangeHandler} className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 focus:shadow-outline text-gray-600 font-medium" placeholder="Enter your alternate phone number..." />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">Lead Source <span class="text-red-600">*</span></label>
                                        <div className="mb-2 flex">
                                            <input type="radio" name='leadOfSource' value='facebook' checked={formData.leadOfSource =="facebook"} onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="email" className="font-bold mb-1 mr-5 text-gray-700 block">Facebook</label>
                                            <input type="radio" name='leadOfSource' value='instagram' checked={formData.leadOfSource =="instagram"} onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="email" className="font-bold mb-1 mr-5 text-gray-700 block">Instagram</label>
                                            <input type="radio" name='leadOfSource' value='direct' checked={formData.leadOfSource =="direct"} onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="email" className="font-bold mb-1 mr-5 text-gray-700 block">direct</label>
                                            <input type="radio" name='leadOfSource' value='website' checked={formData.leadOfSource =="website"} onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">website</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                            : profileStep.step === 2 ? <>
                            <div className="grid grid-cols-3 gap-4 rounded px-6 py-6">
                                 {!propertyData?null:propertyData.map(datas=>(
                                     <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
                                        <div className='text-end'>
                                            <input type="checkbox" value={datas._id} checked={!selectProperty?false:selectProperty.map(check=>check._id==datas._id)} onChange={PropertyChangeHandler} className="text-end w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        </div>
                                        <h5 className="text-lg tracking-tight text-gray-600">Name: {datas.propertyname}</h5>
                                        <h5 className="text-lg tracking-tight text-gray-600">Type: {datas.propertytype}</h5>
                                        <h5 className="text-lg tracking-tight text-gray-600">BHK: {datas.propertybhk}</h5>
                                     </span>
                                 )
                                 )}
                             </div> 
                         </>
                            : profileStep.step === 3 ? <>
                                <label htmlFor="email" className="font-bold mb-1 text-gray-700 block mb-3 mt-8">Loan <span class="text-red-600">*</span></label>
                                <div className="mb-2 flex">
                                    <input type="radio" name='loan' value="yes" checked={formData.loan =="yes"} onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="email" className="font-bold mb-1 mr-5 text-gray-700 block">Yes</label>
                                    <input type="radio" name='loan' value="no" checked={formData.loan =="no"} onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">No</label>
                                </div>
                                <label htmlFor="email" className="font-bold mb-1 text-gray-700 block mb-3">When To Buy <span class="text-red-600">*</span></label>
                                <div className="mb-2 flex">
                                    <input type="radio" name='buy' value='few days' checked={formData.buy =="few days"} onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="email" className="font-bold mb-1 mr-5 text-gray-700 block">Few Days</label>
                                    <input type="radio" name='buy' value='few weeks' checked={formData.buy =="few weeks"} onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="email" className="font-bold mb-1 mr-5 text-gray-700 block">Few Weeks</label>
                                    <input type="radio" name='buy' value='few months' checked={formData.buy =="few months"} onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">Few Months</label>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email" className="font-bold mb-1 text-gray-700 block mb-2">Budget <span class="text-red-600">*</span></label>
                                    <input type="text" name='budget' value={formData.budget} onChange={OnChangeHandler} className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 focus:shadow-outline text-gray-600 font-medium" placeholder="Enter your budget..." />
                                </div>
                            </>
                                : profileStep.step === 4 ? <>
                                    <div className="mb-2 mt-8">
                                        <label htmlFor="email" className="font-bold mb-1 text-gray-700 block mb-2">Notes <span class="text-red-600">*</span></label>
                                        <input type="text" name='desc' value={formData.desc} onChange={OnChangeHandler} className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 focus:shadow-outline text-gray-600 font-medium" placeholder="Enter your notes..." />
                                    </div>
                                    <label htmlFor="email" className="font-bold mb-1 text-gray-700 block mb-3 mt-3">Status <span class="text-red-600">*</span></label>
                                    <div className="mb-2 flex">
                                        <input type="radio" name='status' checked={formData.status =="new"} value='new' onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="email" className="font-bold mb-1 mr-5 text-gray-700 block">New</label>
                                        <input type="radio" name='status' checked={formData.status =="interested"} value='interested' onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="email" className="font-bold mb-1 mr-5 text-gray-700 block">Interested </label>
                                        <input type="radio" name='status' checked={formData.status =="not interested"} value='not interested' onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="email" className="font-bold mb-1 mr-5 text-gray-700 block">Not Interested</label>
                                        <input type="radio" name='status' checked={formData.status =="closed"} value='closed' onChange={OnChangeHandler} className="w-4 h-4 mr-1 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">Closed</label>
                                    </div>
                                </>
                                : null}
                    </div>
                </> : null}
            </div>
            {/* Bottom Navigation */}
            {profileStep.status != 'complete' ? <>
                <div className="fixed bottom-0 left-0 right-0 py-5 bg-white shadow-md" >
                    <div className="max-w-3xl mx-auto px-4">
                        <div className="flex justify-between">
                            <div className="w-1/2">
                                {profileStep.step != 1 ?
                                    <button onClick={PreviousHandler}
                                        className="w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border">Previous</button>
                                    : null}
                            </div>
                            <div className="w-1/2 text-right">
                                {profileStep.step != 4 ?
                                    <button onClick={NextHandler} className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-orange-500 hover:bg-orange-600 font-medium">Next</button>
                                    :
                                    <button onClick={FormSubmitHandler} className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-orange-500 hover:bg-orange-600 font-medium">Submit</button>
                                }
                            </div>
                        </div>
                    </div>
                </div> </>: null}
        </>
    )
}

export default EditCrm;