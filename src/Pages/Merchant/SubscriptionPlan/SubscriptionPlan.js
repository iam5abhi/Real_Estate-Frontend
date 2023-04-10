import React,{useState, useEffect} from 'react';
import { authFetch } from '../../../Middleware/axios/intance';
import Message from '../../../features/Message';
import Timer from '../../../features/ExpairSubscription/Timer';

const data = [
    {
        name:"SILVER",
        validity:"3",
        price:349,
    },
    {
        name:"GOLD",
        validity:"6",
        price:649,
    },
    {
        name:"PLATINUM",
        validity:"12",
        price:1149,
    }
]

const SubscriptionPlan = () => {
    const [message,setMessage]=useState({message:'',type:''})
    const [subscriptionData,setSubscriptionData]=useState()

    const countdownDateTime = new Date(!subscriptionData?0:subscriptionData.endDate).getTime(); 
    const currentTime = new Date().getTime();
    const remainingDayTime = countdownDateTime - currentTime;
    const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));


    const SubscriptionSubmit=(data)=>{
        try {
            const resp = authFetch.post('/api/merchant/suscription',{
                amount:data.price,
                plan:data.name,
                month:data.validity
            });
            setMessage({message:resp.data.message,type:true})
            setTimeout(() => {
              setMessage({message:'',type:''})
            },1000);
          } catch (error) {
            console.log(error)
            // setMessage({message:error,type:false})
        }
    }

    const GetSubscriptionData = async () => {
        try {
            const resp = await authFetch.get(`/api/merchant/suscription`)
            setSubscriptionData(resp.data.data)
        } catch (error) {
            // setMessage({ message: error, type: false })
        }
    }
        
    useEffect(() => {
        GetSubscriptionData()
    }, [])

  return (
        <>
        {message.type !==''?message.type===false?
        <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'/>
        :
        <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
        :null}
        <div className="m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12">
        <div className="p-6 space-y-6 lg:p-8">
            <h3 className="text-3xl text-gray-700 font-semibold text-center">{!subscriptionData?null:subscriptionData.plan}</h3>
            <div>
            <div className="relative flex justify-around">
                <div className="flex items-end transition duration-500 hover:scale-105 lg:hover:scale-110">
                <span className="text-8xl text-gray-800 font-bold leading-0">{!subscriptionData?null:subscriptionData.amount}</span>
                <div className="pb-2">
                    <span className="block text-2xl text-gray-700 font-bold hover:animate-spin">{!subscriptionData?null:"$"}</span>
                </div>
                </div>
            </div>
            </div>
            <ul role="list" className="w-max space-y-4 py-6 m-auto text-gray-600">
            <li className="space-x-2">
                <span className="text-red-500 font-semibold"><i class="fa-solid fa-hourglass-end"></i></span>
                <span className="text-red-500 font-semibold">Left {!subscriptionData?0:totalDays} Days</span>
            </li>
            {data.map(datas=>(
            <li className="space-x-2">
                <span className="text-orange-500 font-semibold">✓</span>
                <span>{datas.name} Price: {datas.price} Rs Validity: {datas.validity} month <button type='button' onClick={()=>SubscriptionSubmit(datas)} className="py-1 px-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white">Buy Plan</button></span>
            </li>
            )
            )}
            </ul>
            <p className="flex items-center justify-center space-x-4 text-lg text-gray-600 text-center">
            <span>Call us at</span>
            <a href="tel:+24300" className="flex space-x-2 items-center text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>
                <span className="font-semibold">+1 000 000</span>
            </a>
            <span>or</span>
            </p>
            {/* <button type="submit" title="Submit" className="block w-full py-3 px-6 text-center rounded-xl transition bg-orange-500 hover:bg-orange-600 active:bg-orange-700">
            <span className="text-white font-semibold">
            UPGRADE PLAN
            </span>
            </button> */}   
        </div>
        </div>
    </>
  )
}

export default SubscriptionPlan;