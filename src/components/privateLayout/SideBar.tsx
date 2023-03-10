import * as React from 'react'
import {
    appRoutes,
} from '../../utils/constants'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { Link, useNavigate } from 'react-router-dom'
import useLocales from '../../hooks/useLocales'
import { useDispatch, useSelector } from '../../redux/store'
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined'
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import Ticket from '../common/icons/tickets'
import { reset, updateWidth } from '../../redux/slices/commonSlice'
import Tooltip from '@mui/material/Tooltip';

import Sidedashboard from '../common/icons/Sidedashboard'
import Sideusermanagement from '../common/icons/Sideusermanagement'
import Sideservices from '../common/icons/Sideservices'
import Sidechat from '../common/icons/Sidechat'
import Sidebillinginvoices from '../common/icons/Sidebillinginvoices'
import Sidetickets from '../common/icons/Sidetickets'
import Sidesetting from '../common/icons/Sidesetting'

export const SideBar = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth || [])
    const { t } = useLocales()
    const navigate = useNavigate()


    const getActiveClass = (path: any) => {
        return window.location.pathname.includes(path) ? 'sidebar-active' : ''
    }
    if (user == null) {
        navigate('/')
    }

    React.useEffect(() => {
        setIsOpen((pre: any) => (!pre))
        dispatch(updateWidth())
        const texts = document.querySelectorAll<HTMLElement>('#link__text')
        const sidebarLeft = document.querySelector(
            '#sidebar-left'
        ) as HTMLElement
        const text = document.querySelector('#link__text') as HTMLElement
        if (text.style.display != 'none') {
            for (let i = 0; i < texts.length; i++) {
                texts[i].style.display = 'none'
                // window.location.pathname
            }
            sidebarLeft.style.width = 'max-content'
        } else {
            for (let i = 0; i < texts.length; i++) {
                texts[i].style.display = 'block'
            }
            sidebarLeft.style.width = '300px'
        }
        dispatch(reset())
    }, [])


    return (
        <>
            <div
                className="Layout__sidebarsidebar"
                id="sidebar-left"
                style={{
                    // transition: 'all 350ms 0ms ease-in',
                    zIndex: 1,
                    height: 'calc(100vh - 90px)',
                    position: 'fixed',
                    top: '90px',
                    left: '0px',
                    bottom: '0px',
                    width: '300px'
                }}
            >
                <div className="sidebar__inner">
                    <ul className="sidebar__list">
                        <li className="list__item">
                            <Tooltip title="Dashboard" placement="right" arrow>
                                <Link
                                    className={`item__link ${getActiveClass(appRoutes.DASHBOARD)}`}
                                    to={appRoutes.DASHBOARD}
                                >
                                    <span className="link__icon">
                                        <Sidedashboard />
                                    </span>
                                    <span className="link__text" id="link__text">
                                        {t<string>('dashboard')}
                                    </span>
                                </Link>
                            </Tooltip>
                        </li>
                        <li className="list__item">
                            <Tooltip title="User Management" placement="right" arrow>
                                <Link className={`item__link ${getActiveClass(appRoutes.USER_MANAGEMENT)}`}
                                    to={appRoutes.USER_MANAGEMENT}>
                                    <span className="link__icon">
                                        <Sideusermanagement />
                                    </span>
                                    <span className="link__text" id="link__text">
                                        {t<string>('userManagement')}
                                    </span>
                                </Link>
                            </Tooltip>
                        </li>
                        <li className="list__item">
                            <Tooltip title="Services" placement="right" arrow>
                                <Link className="item__link" to="">
                                    <span className="link__icon">
                                        <Sideservices />
                                    </span>
                                    <span className="link__text" id="link__text">
                                        {t<string>('services')}
                                    </span>
                                </Link>
                            </Tooltip>
                        </li>
                        <li className="list__item">
                            <Tooltip title="SMS" placement="right" arrow>
                                <Link className="item__link" to="">
                                    <span className="link__icon">
                                        <Sidechat />
                                    </span>
                                    <span className="link__text" id="link__text">
                                        {t<string>('sms')}
                                    </span>
                                </Link>
                            </Tooltip>
                        </li>
                        <li className="list__item">
                            <Tooltip title="Billing Invoices" placement="right" arrow>
                                <Link
                                    className={`item__link ${getActiveClass(appRoutes.BILLING)}`}
                                    to={appRoutes.BILLING}
                                >
                                    <span className="link__icon">
                                        <Sidebillinginvoices />
                                    </span>
                                    <span className="link__text" id="link__text">
                                        {t<string>('billingInvoice')}
                                    </span>
                                </Link>
                            </Tooltip>
                        </li>
                        <li className="list__item">
                            <Tooltip title="Tickets" placement="right" arrow>
                                <Link className="item__link" to={appRoutes.BILLING_TICKET}>
                                    <span className="link__icon">
                                        {/* <ConfirmationNumberOutlinedIcon /> */}
                                        <Sidetickets />
                                    </span>
                                    <span className="link__text" id="link__text">
                                        {t<string>('tickets')}
                                    </span>
                                </Link>
                            </Tooltip>
                            {!isOpen &&
                                <ul className="childMenu">
                                    <li className="list__item">
                                        <Tooltip title="Billing Ticket" placement="right" arrow>
                                            <Link
                                                className={`item__link ${getActiveClass(appRoutes.BILLING_TICKET)}`}
                                                to={appRoutes.BILLING_TICKET}>
                                                <span className="link__text" id="link__text">
                                                    {t<string>('billingTicket')}
                                                </span>
                                            </Link>
                                        </Tooltip>
                                    </li> <li className="list__item">
                                        <Tooltip title="Service Assurence" placement="right" arrow>
                                            <Link
                                                className={`item__link ${getActiveClass(appRoutes.SERVICE_ASSURANCE)}`}
                                                to={appRoutes.SERVICE_ASSURANCE}>
                                                <span className="link__text" id="link__text">
                                                    {t<string>('seviceAssurence')}
                                                </span>
                                            </Link>
                                        </Tooltip>
                                    </li>
                                </ul>}
                        </li>
                        <li className="list__item">
                            <Tooltip title="Support" placement="right" arrow>
                                <Link className="item__link" to="">
                                    <span className="link__icon">
                                        <Sidesetting />
                                    </span>
                                    <span className="link__text" id="link__text">
                                        {t<string>('support')}
                                    </span>
                                </Link>
                            </Tooltip>
                        </li>
                    </ul>
                </div>

                <Tooltip
                    title="EXPAND"
                    placement="top"
                    arrow
                >
                    <button
                        type="button"
                        className="sidebarToggle"
                        id='sidebar-button'
                        onClick={() => {
                            setIsOpen((pre: any) => (!pre))
                            dispatch(updateWidth())
                            const texts = document.querySelectorAll<HTMLElement>('#link__text')
                            const sidebarLeft = document.querySelector(
                                '#sidebar-left'
                            ) as HTMLElement
                            const text = document.querySelector('#link__text') as HTMLElement
                            if (text.style.display != 'none') {
                                for (let i = 0; i < texts.length; i++) {
                                    texts[i].style.display = 'none'
                                }
                                sidebarLeft.style.width = 'max-content'
                                sidebarLeft.style.padding = '50px 50px'
                            } else {
                                for (let i = 0; i < texts.length; i++) {
                                    texts[i].style.display = 'block'
                                }
                                sidebarLeft.style.width = '300px',
                                    sidebarLeft.style.padding = '50px 30px'
                            }
                        }}
                    >
                        {isOpen ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
                    </button>

                </Tooltip>

            </div>
        </>
    )
}
