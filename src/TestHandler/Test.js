import React, { useState } from 'react';
import Message from '../features/Message';


// // const config = [
// //     { id: 1, name: 'country',  },
// //     { id: 2, name: 'state', },
// //     { id: 3, name: 'city', }
// //   ]

// const Test = () => {
// const [message,setMessage]=useState({message:'',type:''})
//     const [formFields, setFormFields] = useState({ country: '', state: '', city: '' })
//     const [formData, setFormData] = useState()

//     const OnChangeHandler =(event)=>{
//         setFormFields((pre)=>({
//             ...pre,
//             [event.target.name]:event.target.value 
//         }))
//     }

//     const OnSubmitHandler =(event)=>{
//           event.preventDefault();
//           setFormData(formFields)
//     }
//   return (
//         <>
//         <div className="max-w-screen mx-auto">
//               <div className="container mx-auto">
//                 <div className="col-span-2">
//                   <div className="border-b border-gray-200 rounded">
//                       <h2 className=" text-2xl text-center font-semibold mt-12">Add Details</h2> 
//                     <div className="overflow-auto">
//                     <div className="container w-11/15 mx-auto px-3 bg-white rounded  ">
//                       <div className="relative flex flex-col flex-auto min-w-0 p-4 break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-2 draggable " draggable="true">
//                         <form onSubmit={OnSubmitHandler}>
//                             <div className='mb-2'>
//                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country <span class="text-red-600">*</span></label>
//                                 <input type="text" name='country' value={formFields.country} onChange={OnChangeHandler} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder={`Enter Country`} />
//                             </div>
//                             {formFields.country.length != 0?
//                                 <div className='mb-2'>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State <span class="text-red-600">*</span></label>
//                                     <input type="text" name='state' value={formFields.state} onChange={OnChangeHandler} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder={`Enter State`} />
//                                 </div>:null
//                             }
//                             {formFields.state.length && formFields.country.length != 0?
//                                 <div className='mb-2'>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City <span class="text-red-600">*</span></label>
//                                     <input type="text" name='city' value={formFields.city} onChange={OnChangeHandler} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder={`Enter City`} />
//                                 </div>:null
//                             }
//                             <div className='grid justify-items-center mt-5'>
//                             <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400
//                                 focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 mb-2 focus:outline-none">Submit</button>
//                             </div>
//                         </form>
//                         {!formData?null:<div className='text-center text-xl'> country: {formData.country} <br/> state: {formData.state} <br/> city: {formData.city} </div>}
//                       </div>
//                     </div>
//                     {message.type !==''?message.type===false?
//                     <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'/>
//                     :
//                     <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
//                     :null}
//               </div>
//               </div>
//             </div>
//           </div>
//          </div>
//     </>
//   )
// }

// export default Test;


function Text() {
    let feild = ['country','state','district','sub_district',"done"]
    const [message, setMessage] = useState({ message: '', type: '' })
    const [count, setCount] = useState(1)
    const [fields, setFields] = useState([{id:1, name:'country', type:''}]);
    const [formData, setFormData] = useState();

    console.log(fields,"fields")
    function handleChange(i, event) {
        const newState = [...fields];
        newState[i] = { 
          ...newState[i],
          type:event.target.value,
        }
        setFields(newState);
    }

    function handleAdd() {
        if(fields.length ==0){
        const values = [...fields];
        values.push({id:1, name:'country', type:''});
        setFields(values);
        }else if(feild[count]=="done"){
            return false;
        }else{
        const values = [...fields];
        values.push({id:count+1,name:feild[count],type:''});
        setFields(values);
        setCount(count+1)
        }
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
        // fields.pop(); // in case remove last index only
        if(count>1){
            setCount(count-1)
        }
    }

    function submitHandler(event) {
        event.preventDefault();
        setFormData(fields);
    }

    return (
        <div className="max-w-screen mx-auto">
            <div className="container mx-auto">
                <div className="col-span-2">
                    <div className="border-b border-gray-200 rounded">
                        <h2 className=" text-2xl text-center font-semibold mt-12">Add Details</h2>
                        <div className="overflow-auto">
                            <div className="container w-11/15 mx-auto px-3 bg-white rounded  ">
                                <div className="relative flex flex-col flex-auto min-w-0 p-4 break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-2 draggable " draggable="true">
                                    <form onSubmit={submitHandler}>
                                        <button type="button" className="mb-5 text-white text-end bg-green-600 hover:bg-green-400 focus:ring-4 focus:ring-green-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 mb-2 focus:outline-none" onClick={() => handleAdd()}>
                                            Add Input
                                        </button>
                                        {/* <button type="button" className="mb-5 text-white text-end bg-red-600 hover:bg-red-400 focus:ring-4 focus:ring-red-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 mb-2 focus:outline-none"
                                                    onClick={() => handleRemove()}>
                                         {/* remove last index only use */}    {/* Remove
                                                   </button> */}
                                        {fields.map((field, idx) => {
                                            return (
                                                <div className='flex mb-5' key={`${field}-${idx}`}>
                                                    <div className='w-full'>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{field.name} <span class="text-red-600">*</span></label>
                                                    <input
                                                        type="text"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2"
                                                        placeholder="Enter text"
                                                        value={field.type || ""}
                                                        onChange={(e) => handleChange(idx, e)}
                                                    />
                                                    </div>
                                                    <button type="button" className="text-white text-end bg-red-600 hover:bg-red-400 focus:ring-4 focus:ring-red-300 font-semibold rounded-full text-lg px-2.5 ml-2 mb-2 focus:outline-none"
                                                    onClick={() => handleRemove(idx)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        <button className="text-white text-end bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 mb-2 focus:outline-none mt-5" type="submit">
                                            Submit
                                        </button>
                                    </form>
                                    {!formData?null:formData.map((data=>(
                                        <div className='text-center text-xl'> {data.name}: {data.type} <br/></div>
                                    )))}
                                </div>
                            </div>
                            {message.type !== '' ? message.type === false ?
                                <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg' />
                                :
                                <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Text;