import { SideBar } from './SideBar'
import { HeaderBar } from './HeaderBar'
import HttpLoader from '../loader/HttpLoader'
import { useSelector } from '../../redux/store'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { apiVrbls, appRoutes, localStorageVar, RBACK_MODULES } from '../../utils/constants'
import { getFromLocalStorage } from '../../hooks/useLocalStorage'
import { useEffect } from 'react'
import { useDispatch } from '../../redux/store';
import { getuserInfo } from '../../redux/slices/authSlice'
import AccessDenined from '../AccessDenined/AccessDenined'
export const PrivateLayout = () => {
    const { loading } = useSelector((state: any) => state.common || {});
    const { user } = useSelector((state: any) => state.auth || {});
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (user) {
            dispatch(getuserInfo(user[apiVrbls.USER.EMAIL_ID]))
        }
    }, [location]);

    const checkAccess = () => {
        if (Object.keys(RBACK_MODULES).includes(location.pathname)) {
            return user.profiles[0].module.includes(RBACK_MODULES[location.pathname])
        } else {
            return true;
        }
    }

    if (!(getFromLocalStorage(localStorageVar.TOKEN_VAR)) || !(getFromLocalStorage(localStorageVar.TOKEN_VAR) !== null || (user == null))) {
        return <Navigate to={appRoutes.LOGIN} />
    }

    return (
        <div className="Layout__wrapper">
            <h1>{JSON.stringify(checkAccess())}</h1>
            {loading && <HttpLoader />}
            <HeaderBar />
            <SideBar />
            {checkAccess() ? <Outlet /> : <AccessDenined />}
        </div>
    )
}

export default PrivateLayout
