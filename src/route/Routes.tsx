import { Suspense, lazy } from 'react'
import Loading from '../components/loader/Loading'
import { appRoutes } from '../utils/constants'
import { useRoutes } from 'react-router-dom'

// eslint-disable-next-line react/display-name
const Loadable = (Component: any) => (props: any) => {
    return (
        <Suspense fallback={<Loading />}>
            <Component {...props} />
        </Suspense>
    )
}
function Routes() {
    return useRoutes([
        {
            path: '',
            element: <OnBoardingLayout />,
            children: [
                { path: appRoutes.LOGIN, element: <Login /> },
                { path: appRoutes.ROOT, element: <HomeScreen /> },
                { path: appRoutes.RESET_PASSWORD, element: <ResetPassword /> },
                { path: appRoutes.SET_PASSWORD, element: <SetPassword /> },
            ],
        },
        {
            path: '',
            element: <PrivateLayout />,
            children: [
                { path: appRoutes.WELCOME, element: <Welcome /> },
                { path: appRoutes.ACCOUNT_DETAILS, element: <AccountDetails /> },
                { path: appRoutes.CHANGE_PASSWORD, element: <ChangePassword /> },
                { path: appRoutes.DASHBOARD, element: <Dashboard /> },
                { path: appRoutes.USER_MANAGEMENT, element: <UserManagement /> },
                { path: appRoutes.BILLING_TICKET, element: <BillingTicket /> },
                { path: appRoutes.SERVICE_ASSURANCE, element: <ServiceAssurance /> },
                { path: appRoutes.BILLING, element: <Billing /> },
            ],
        },
        { path: appRoutes.NOT_FOUND, element: <Notfound /> },
    ])
}



const Login = Loadable(lazy(() => import('../components/login-screen/Login')))
const ResetPassword = Loadable(lazy(() => import('../components/reset-password/ResetPassword')))
const ForgotPassword = Loadable(lazy(() => import('../components/forgot-password/ForgotPassword')))
const SetPassword = Loadable(lazy(() => import('../components/set-password/SetPassword')))
const Notfound = Loadable(lazy(() => import('../components/notfound/Notfound')))
const HomeScreen = Loadable(lazy(() => import('../components/home/HomeScreen')))
const Billing = Loadable(lazy(() => import('../components/billing/Billing')))
const BillingTicket = Loadable(lazy(() => import('../components/billing-ticket/BillingTicket')))
const ServiceAssurance = Loadable(lazy(() => import('../components/service-assrunace/ServiceAssurance')))
const ChangePassword = Loadable(lazy(() => import('../components/change-password/ChangePassword')))
const UserManagement = Loadable(lazy(() => import('../components/user-management/UserManagement')))
const Dashboard = Loadable(lazy(() => import('../components/dashboard/Dashboard')))
const PrivateLayout = Loadable(lazy(() => import('../components/privateLayout/PrivateLayout')))
const OnBoardingLayout = Loadable(lazy(() => import('../components/onBoardingLayout/onBoardingLayout')))
const AccountDetails = Loadable(lazy(() => import('../components/account-details/AccountDetails')))
const Welcome = Loadable(lazy(() => import('../components/welcome/welcome')))

export default Routes
