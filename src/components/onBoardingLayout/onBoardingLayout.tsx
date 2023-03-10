import { Box } from '@mui/material'
import BackgroundBox from '../common/elements/backGroundBox'
import BannerBg from '../common/elements/banner'
import Header from './Header'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { appRoutes } from '../../utils/constants'
import { useSelector } from '../../redux/store'
const OnBoardingLayout = () => {
    const location = useLocation();
    const { user } = useSelector((state: any) => state.auth || {});
    if (location.pathname == appRoutes.SET_PASSWORD) {
        if (!user) {
            return <Navigate to={appRoutes.LOGIN} />
        }
    }
    return (
        <>
            <Header />
            <Box className="account__screen">
                {/* ACCOUNT SCREEN BANNER START*/}
                <BannerBg />
                {/* ACCOUNT SCREEN ANIMATION START */}
                <BackgroundBox />
                {/* Child Component */}
                <Outlet />
            </Box>
        </>
    )
}

export default OnBoardingLayout