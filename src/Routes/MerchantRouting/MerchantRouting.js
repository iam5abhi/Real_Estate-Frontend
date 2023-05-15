import React from 'react';
import { Breathing } from 'react-shimmer'
import { Route,Routes,Navigate} from 'react-router-dom';
import MerchantHome from '../../Pages/Merchant/Home/MerchantHome';
import ChangePassword from '../../Pages/Change-Password/ChangePassword';
import PrivateRoute from '../../Middleware/Private Route/PrivateRoute'
import SubscriptionPlan from '../../Pages/Merchant/SubscriptionPlan/SubscriptionPlan';
import Leads from '../../Pages/Merchant/Leads/Leads';
import AllProperty from '../../Pages/Merchant/Property/AllProperty';
import Text from '../../Pages/Merchant/Leads New/Text';

const MerchantRouting = ({subscriptionData}) => {

    const Student = [
        {
            path: '/',
            component: MerchantHome,
        },
        {
            path: 'change-password',
            component: ChangePassword,
        },
        {
            path: 'subscription',
            component:SubscriptionPlan,
        },
        {
            path: 'leads',
            component:Leads,
        }, 
        {
            path: 'property',
            component:AllProperty,
        },
        {
            path: 'test',
            component:Text,
        },
        // {
        //     path: 'track-progress',
        //     component:Myproject,
        // },
        // {
        //     path: 'profile/*',
        //     component:Student_Profile,
        // },
        // {
        //     path: 'upload-assignment/:id',
        //     component:UploadAssignment,
        // },
    ]

  return (
        <>
        <Routes>
            {
              Student.map((route) => {
                return <Route
                path={route.path}
                element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute> <route.component subscriptionData={subscriptionData}/> </PrivateRoute> </React.Suspense>}/>
            })
            }
            {/* <Route path='view-profile/:id' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                    <StudentPublicProfile />
            </React.Suspense>}/>  */}
        </Routes>
    </>
  )
}

export default MerchantRouting