import './i18n'
import { Toggle } from './themes/Toggle'
import { useDarkMode } from './themes/useDarkMode'
import { GlobalStyles, lightTheme, darkTheme } from './themes/globalStyles'
import { ThemeProvider } from 'styled-components'
import useAuth from './hooks/useAuth'
import './assets/sass/global/global.scss'
import { appThemes, localStorageVar } from './utils/constants'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Routes from './route/Routes'
import { createContext, useEffect } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useDispatch as useAppDispatch } from './redux/store'
import { logout } from './redux/slices/authSlice'
import { store } from './redux/store'
import ErrorBoundary from './components/error-boundary/ErrorBoundary'
import { updateCal } from './redux/slices/billingSlice'
import { setInLocalStorage } from './hooks/useLocalStorage'

export const AppContext = createContext({});

const App = () => {
    const dispatch = useAppDispatch()
    const onIdle = () => {
        if (localStorage.getItem(localStorageVar.TOKEN_VAR)) {
            dispatch(logout());
        }
    }
    const idelTimeOut = useIdleTimer({
        onIdle,
        timeout: 30 * 1000 * 60,
        promptTimeout: 0,
        events: [
            'mousemove',
            'keydown',
            'wheel',
            'DOMMouseScroll',
            'mousewheel',
            'mousedown',
            'touchstart',
            'touchmove',
            'MSPointerDown',
            'MSPointerMove',
            'visibilitychange'
        ],
        immediateEvents: [],
    })

    const clickEventHandler = (e: any) => {
        try {
            const date = document.getElementsByClassName('MuiPickersPopper-root');
            if (date.length > 0) {
                const clEl = document.querySelector(`.MuiPickersPopper-root .${e.target.classList[0]}`);
                if (clEl == null) {
                    dispatch(updateCal(false));
                }
                const n = document.querySelector(`#date-picker .${e.target.classList[0]}`);
                if (n != null) {
                    dispatch(updateCal(true));
                }
            }
            const trEle = e.target.classList.contains("clkIgnr");
            if (trEle === false) {
                const d: any = document;
                const w: any = window;
                d.getElementById(w.Oid).style.display = "none";
                w.Oid = null
            }
        } catch {

        }

    }
    useEffect(() => {
        setInLocalStorage('i18nextLng', 'English')
        document.addEventListener('click', clickEventHandler, true);
    }, [])

    useAuth()
    const [theme, toggleTheme] = useDarkMode()
    const themeMode = theme === appThemes.LIGHT_THEME ? lightTheme : darkTheme
    return (
        <AppContext.Provider value={toggleTheme}>
            <ThemeProvider theme={themeMode}>
                <GlobalStyles />
                <ErrorBoundary>
                    <Routes />
                </ErrorBoundary>
                <Toggle theme={theme} toggleTheme={toggleTheme} />
                <ToastContainer />
            </ThemeProvider>
        </AppContext.Provider>

    )
}

export default App
