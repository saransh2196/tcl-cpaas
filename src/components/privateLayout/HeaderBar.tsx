import * as React from 'react'
import {
    apiVrbls,
    localStorageVar,
} from '../../utils/constants'
import Select from '@mui/material/Select'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Link, useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import { availableLanguages } from '../../i18n'
import {
    getFromLocalStorage,
    setInLocalStorage,
} from '../../hooks/useLocalStorage'
import useLocales from '../../hooks/useLocales'
import { useTranslation } from 'react-i18next'
import { logout } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from '../../redux/store'
import Setting from '../common/icons/setting'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import Globe from '../../assets/images/svg/globe.svg'
import GlobeDark from '../../assets/images/svg/globe-dark.svg'
import TclLogo from '../common/elements/Logo'
import { AppContext } from '../../App'


export const HeaderBar = () => {
    const toggleTheme: any = React.useContext(AppContext);
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth || {})
    const { i18n } = useTranslation()
    const { t } = useLocales()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const navigate = useNavigate()
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handelLogout = () => {
        dispatch(logout())
    }
    const getitem = getFromLocalStorage(localStorageVar.THEME_VAR);

    if (user == null) {
        navigate('/')
    }

    return (
        <>
            <div
                className="Layout__navbar"
                id="sidebar-top"
                style={{ position: 'fixed', top: 0, zIndex: 2 }}
            >
                <div className="Layout__container">
                    <div className="logo" >
                        <TclLogo theme={getitem} />
                    </div>
                    <div className="right__elements">
                        <div className="right__elementsItem search__group">
                            <Paper
                                component="form"
                                className="search__form"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 478,
                                }}
                            >
                                <InputBase
                                    onFocus={(e) => {
                                        e.target.placeholder = ''
                                    }}
                                    onBlur={(e) => {
                                        e.target.placeholder = `${t<string>('searchWithinSite')}`
                                    }}
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder={t<string>('searchWithinSite')}
                                    inputProps={{
                                        'aria-label': 'Search Products, Orders and Clients',
                                    }}
                                />
                                <IconButton
                                    id="searchicon-sidebar"
                                    type="button"
                                    sx={{ p: '10px' }}
                                    aria-label="search"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </div>
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
                        <div className="right__elementsItem language__selector">
                            <FormControl
                                sx={{
                                    m: 1,
                                    minWidth: 100,
                                    position: 'relative',
                                }}
                                size="small"
                                id="lang-background-invoices"
                            >
                                <img
                                    src={getitem == 'light' ? Globe : GlobeDark}
                                    alt=""
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '-12px',
                                        transform: 'translateY(-50%)',
                                    }}
                                />
                                <Select
                                    MenuProps={{
                                        disableScrollLock: true,
                                    }}
                                    labelId="demo-select-small"
                                    id="demo-select-small-out"
                                    value={i18n.language == ('en-ZA') ? 'English' : i18n.language == ('en-US') ? 'English' : i18n.language == ('en-GB') ? 'English' : i18n.language}
                                    label="Language"
                                    onChange={(e) => {
                                        i18n.changeLanguage(e.target.value)
                                        setInLocalStorage('lng', e.target.value)
                                    }}
                                >
                                    {availableLanguages.map((language) => (
                                        <MenuItem key={language} value={language}>
                                            {language == 'en-ZA' ? 'English' : language}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="right__elementsItem notification">
                            <Badge
                                badgeContent={4}
                                id="notification-badge"
                                sx={{
                                    color: '#fff',
                                }}
                            >
                                <NotificationsNoneIcon color="action" fontSize='inherit' />
                            </Badge>
                        </div>
                        <div className="right__elementsItem profile__setting">
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{
                                    marginRight: 0,
                                    '& .MuiAvatar-root': {
                                        fontSize: 12,
                                    },
                                }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src=""
                                    sx={{ width: 25, height: 25 }}
                                />
                                <span className="userName">{user[apiVrbls.USER.FIRST_NAME]}</span>
                                <ArrowDropDownIcon className="dropArrow" />
                            </Button>
                            <Menu
                                className="profile__menu right__menu"
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <div className="dropProfile__wrapper">
                                        <div className="profile__picture">
                                            <Avatar alt="Remy Sharp" src="" />
                                        </div>
                                        <div className="profile__content">
                                            <p className="name">{user[apiVrbls.USER.FIRST_NAME]}</p>
                                            <p className="deg">{user[apiVrbls.USER.ROLE]}</p>
                                            <p className="status">
                                                {t<string>('lastActivity')}: 2 Aug, 2022{' '}
                                                {t<string>('at')} 5:30{t<string>('amPm')}
                                            </p>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={handleClose} style={{ paddingTop: '8px' }}>
                                    <Link
                                        to="/accountdetails"
                                        className="profile__dropLink userinfo-dropdown"
                                    >
                                        <span className="icon">
                                            <Setting />
                                        </span>
                                        <span className="text">{t<string>('setting')}</span>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to="/change-password" className="profile__dropLink userinfo-dropdown">
                                        <span className="icon">
                                            <LockOutlinedIcon />
                                        </span>
                                        <span className="text">{t<string>('changePassword')}</span>
                                    </Link>
                                </MenuItem>
                                <MenuItem className="logout-li" onClick={handelLogout} style={{ paddingTop: '12px' }}>
                                    <span className="icon">
                                        <LogoutOutlinedIcon />
                                    </span>
                                    <span className="text logout-text">
                                        {t<string>('logout')}
                                    </span>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
