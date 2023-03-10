import { useEffect, useState } from 'react'
import AddUser from './actionHandlers/AddUser'
import DataTable from '../common/tables/DataTables'
import { BreadCrums } from '../common/elements/BreadCrum'
import { PageSearch } from '../common/elements/PageSearch'
import { apiVrbls, breadCrums, cardsValues, dataTables } from '../../utils/constants'
import {
    useDispatch as useAppDispatch,
    useSelector
} from '../../redux/store'
import { cardFilter, ChangePageusers, clearAllfilter, ClmSearch, edituserapiCall, filterData, loadUsers, removeCLmFilter, searchData, sortData } from '../../redux/slices/userManagmentSlice'
import useLocales from '../../hooks/useLocales'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Card from '../common/elements/card'
import { getCardCount } from '../../utils/helpers'
import UserInfoCard from './actionHandlers/UserInfoCard'
import { Box } from '@mui/material'
import { Tooltip } from '@mui/material'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import Allusers from '../../assets/images/svg/Allusers'
import Activeusers from '../../assets/images/svg/Activeusers'
import Inactiveusers from '../../assets/images/svg/Inactiveusers'
import Invitedusers from '../../assets/images/svg/Invitedusers'
import EditUser from './actionHandlers/edituser'
import ModalUpdatedUserDetails from '../modals/ModalUpdatedUserDetails'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { DateAction } from '../common/tables/actions/DateAction'
import { ExportTo } from '../common/tables/actions/ExportTo'
import { PageItems } from '../common/tables/actions/PageItems'
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { ChangePagination } from '../common/tables/actions/changePagination'
import { UpdateUserBody } from '../../utils/ApiRequestbody'
export const UserManagement = ({ toggleTheme }: { toggleTheme: any }) => {
    const { PageData = [], MasterData = [], total, page, take, filterValue } = useSelector((state: any) => state.userManagemnt || {});
    const { dashBoardWidth } = useSelector((state: any) => state.common);
    const [dateRange, setDateRange] = useState<any>([null, null]);
    const getDate = (dateRange: any) => {
        const s = `${new Date(dateRange).toLocaleDateString()}`.split("/");
        return `${s[2]}-${s[0]}-${s[1]}`
    }
    const [grid, setGrid] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadUsers({
            searchValue: "",
            ...dateRange[0] != null && { fromDate: getDate(dateRange[0]) },
            ...dateRange[1] != null && { toDate: getDate(dateRange[1]) },
        }
        ))
    }, [dateRange])
    const { t } = useLocales()
    const cards = [
        { state: 'active', titel: t('allUsers'), value: getCardCount(MasterData, apiVrbls.USER_MANAGMENT.STATUS, ''), icon: <Allusers />, action: cardFilter(apiVrbls.USER_MANAGMENT.STATUS, "") },
        { titel: t('active'), value: getCardCount(MasterData, apiVrbls.USER_MANAGMENT.STATUS, cardsValues.USER_MANAGEMENT.ACTIVE), icon: <Activeusers />, action: cardFilter(apiVrbls.USER_MANAGMENT.STATUS, cardsValues.USER_MANAGEMENT.ACTIVE) },
        { titel: t('inactive'), value: getCardCount(MasterData, apiVrbls.USER_MANAGMENT.STATUS, cardsValues.USER_MANAGEMENT.INACTIVR), icon: <Inactiveusers />, action: cardFilter(apiVrbls.USER_MANAGMENT.STATUS, cardsValues.USER_MANAGEMENT.INACTIVR) },
        { titel: t('invited'), value: getCardCount(MasterData, apiVrbls.USER_MANAGMENT.STATUS, cardsValues.USER_MANAGEMENT.INVITED), icon: <Invitedusers />, action: cardFilter(apiVrbls.USER_MANAGMENT.STATUS, cardsValues.USER_MANAGEMENT.INVITED) },
    ]
    // State for Edit Profile
    const [showEditProfile, setShowEditProfile] = useState(false);
    const handleShowEditProfile = () => {
        setShowEditProfile(!showEditProfile);
    };
    // State for Add User
    const [updateopen, setUpdateopen] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [edituser, setedituser] = useState(false);
    const [active, setactive] = useState({});
    const handleShowAddUser = () => {
        setShowAddUser(!showAddUser);
        updateData();
    };
    const handleeditUser = () => {
        setedituser(!edituser);
        updateData();
    };
    const updateData = () => {
        dispatch(loadUsers({
            searchValue: "",
            ...dateRange[0] != null && { fromDate: getDate(dateRange[0]) },
            ...dateRange[1] != null && { toDate: getDate(dateRange[1]) },
        }))
    }
    const editHandler = (item: any) => (<Tooltip title={t<string>('edituser')}>
        <button className="actionButton__item" onClick={() => {
            setactive(item.item);
            setTimeout(() => {
                setedituser(true);
            }, 10);
        }} >
            <span>
                {' '}
                <ModeEditOutlinedIcon />{' '}
            </span>
        </button>
    </Tooltip>)

    const ChnageStatus = (email: any, stauts: any) => {
        const body = UpdateUserBody({
            emailId: email,
            username: email,
            status: stauts
        })
        dispatch(edituserapiCall(body, (status: boolean) => {
            if (status) {
                updateData();
            } else {
                updateData();
            }
        }))
    }

    const InactvieHandler = (item: any) => (
        <>
            {item.item[apiVrbls.USER_MANAGMENT.STATUS] == cardsValues.USER_MANAGEMENT.ACTIVE &&
                <Tooltip title={t<string>('inactiveUser')}>
                    <button className="actionButton__item onlySVG" onClick={() => {
                        ChnageStatus(item.item[apiVrbls.USER_MANAGMENT.EMAIL_ID], cardsValues.USER_MANAGEMENT.INACTIVR)
                    }}>
                        <span className='inactive'>
                            <RemoveCircleOutlineIcon />{' '}
                        </span>
                    </button>
                </Tooltip>}
            {item.item[apiVrbls.USER_MANAGMENT.STATUS] == cardsValues.USER_MANAGEMENT.INACTIVR &&
                <Tooltip title={t<string>('activeUser')}>
                    <button className="actionButton__item onlySVG" onClick={() => {
                        ChnageStatus(item.item[apiVrbls.USER_MANAGMENT.EMAIL_ID], cardsValues.USER_MANAGEMENT.ACTIVE)
                    }}>
                        <span className='active'>
                            <Activeusers />{' '}
                        </span>
                    </button>
                </Tooltip>}
        </>
    )



    const inactivecard = (item: any) => {
        console.log(item);
    }

    const editcard = (item: any) => {
        setactive(item);
        setTimeout(() => {
            setedituser(true);
        }, 10);
    }

    const [gridView, setGridView] = useState<boolean>(true);
    const handleGridView = () => {
        setGridView(!gridView);
    }

    const TableData = dataTables.USER_MANAGMENT(PageData, MasterData, InactvieHandler, editHandler, editcard, inactivecard);

    return (

        <div >
            <div className="Layout__content" id="main-div-element" style={{
                marginLeft: `${dashBoardWidth}`, width: `calc(100% - ${dashBoardWidth}.split('p')[0]}px`
            }}>
                <ModalUpdatedUserDetails data={active} open={updateopen} setOpen={setUpdateopen} />
                {edituser && <EditUser data={active} handleeditUser={handleeditUser} edituser={edituser} setUpdateopen={setUpdateopen} />}
                <AddUser handleShowAddUser={handleShowAddUser} showAddUser={showAddUser} />
                <div className="content__header">
                    <BreadCrums data={breadCrums.USER_MANAGEMENT} />
                    <PageSearch searchFn={searchData} searchPlaceholder='searchusers' />
                </div>
                <div id="main-div" className="card-wrapper-1 user-management-cards">
                    {cards.map((q: any, i: any) => <Card cardData={cards} data={q} key={i} />)}
                </div >
                {/* Action Items */}

                <div className="action__elements">
                    {/* PageItems */}
                    <PageItems pageAction={ChangePageusers} pagination={{ take, total, page }} />
                    {/* role filter */}
                    <div className='actions__child'>
                        <select className='admin' onChange={(e) => {
                            dispatch(cardFilter(apiVrbls.USER_MANAGMENT.ROLE, e.target.value))
                        }}>
                            <option value="">all</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                    </div>
                    {/* Date Action */}
                    <DateAction setDateRange={setDateRange} dateRange={dateRange}></DateAction>
                    {/* grid switch */}
                    <div className='grid_icons__container' >
                        <div className='grid_icons__item' style={{ backgroundColor: grid ? '#fff' : 'transparent', }}><ViewComfyOutlinedIcon onClick={() => { setGrid(true) }} /> </div>
                        <div className='grid_icons__item' style={{ backgroundColor: grid ? 'transparent' : '#fff', }}><ListAltOutlinedIcon onClick={() => { setGrid(false) }} /></div>
                    </div>
                    {/* Export  */}
                    <ExportTo allMasterData={PageData} tableName={"usermanagment"} />
                    {/* Add  user */}

                    <div className='actions__child'>
                        <Button onClick={handleShowAddUser} variant='outlined' startIcon={<AddIcon />} className='add_user__btn' >
                            {t<string>('addUser')}
                        </Button>
                    </div>
                </div>

                {!grid ?
                    <DataTable
                        sortAction={sortData}
                        filterAction={filterData}
                        clearFilterClm={removeCLmFilter}
                        filterValues={filterValue}
                        ClmSearch={ClmSearch}
                        clearAllfilter={clearAllfilter}
                        TableData={TableData} />
                    : <>
                        <Box className='single-cards-container' style={{ marginTop: '50px' }}>
                            {TableData.data && TableData.data.map((item: any, index: any) => (<UserInfoCard key={`grid${index}`}
                                data={item}
                                inactiveUser={item.handlers.inactiveHandler}
                                edituserHandler={item.handlers.editcard}
                            />))}
                        </Box>
                    </>}
                <ChangePagination pageAction={ChangePageusers} pagination={{ take, total, page }} />
            </div>
        </div>


    )
}

export default UserManagement
