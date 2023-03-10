import { SyntheticEvent, useContext } from 'react'
import { useDispatch as useAppDispatch } from '../../redux/store'
import { logout } from '../../redux/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import useLocales from '../../hooks/useLocales'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useSelector } from 'react-redux'
import TclLogo from '../common/elements/Logo'
import LanguageSelector from '../header-sub-components/LanguageSelector'
import { AppContext } from '../../App'

const Header = () => {
    const toggleTheme: any = useContext(AppContext);
    const { t } = useLocales()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user } = useSelector((state: any) => state.auth || []);
    const logoutHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <header>
                <div className="container">
                    <TclLogo theme="dark" />
                    <ul className="navbar-items">
                        <li className="item">
                            {user !== null ? (
                                <Link to="" onClick={logoutHandler}>
                                    {t<string>('logoutBtn')}
                                </Link>
                            ) : (window.location.pathname.match(/^\/login/) ? ('') : <Link to="/login">{t<string>('loginBtn')}</Link>)}
                        </li>
                        <li className="item header-lang-bg">
                            <LanguageSelector />
                        </li>
                        <li className="item">

                            <div className="right__elementsItem theme__toggle">
                                <div className="toggle__wrapper">
                                    <button className="lightMode active" onClick={toggleTheme}>
                                        <LightModeIcon />
                                    </button>
                                    <button className="darkMode" onClick={toggleTheme}>
                                        <DarkModeIcon />
                                    </button>
                                </div>
                            </div>

                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header
