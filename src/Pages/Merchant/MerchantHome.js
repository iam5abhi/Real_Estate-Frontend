import React from 'react'
import { NavLink } from 'react-router-dom'

const MerchantHome = ({ subscriptionData }) => {
  const countdownDateTime = new Date(!subscriptionData?null:subscriptionData.endDate).getTime(); 
  const currentTime = new Date().getTime();
  const remainingDayTime = countdownDateTime - currentTime;
  const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
  return (
        <>
          {!subscriptionData?"MerchantHome":
          <div className="flex min-h-full items-center justify-center">
            <div className="w-full space-y-4 rounded-lg px-10 py-10">
                {/*-------------------DESKTOP VIEW*/}
                <div className="hidden md:block">
                  <div className="grid gap-3 md:gap-6 mb-6 grid-cols-2 md:grid-cols-4">
                    <div >
                      <NavLink to="/auth/student/profile" className="block max-w-sm md:p-6 p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div>
                        <h5 className="-mt-2 mb-2 text-xl md:text-2xl text-center font-bold tracking-tight text-gray-900">
                        Subscription</h5>
                        <h5 className="mb-2 text-xl md:text-xl text-center text-red-500 font-bold tracking-tight text-gray-900">
                           Left {totalDays} days</h5>
                          <h5 className="mb-2 text-xl md:text-2xl text-center font-bold tracking-tight text-gray-900">
                           {subscriptionData.plan}</h5>
                        </div>
                      </NavLink>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
                {/*-------------------DESKTOP VIEW END*/}
            </div>
          </div>
          }
        </>
    )
}

export default MerchantHome