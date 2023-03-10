import { useEffect, useState } from 'react'
import DataTable from '../common/tables/DataTables'
import { BreadCrums } from '../common/elements/BreadCrum'
import { PageSearch } from '../common/elements/PageSearch'
import { apiVrbls, breadCrums, cardsValues, dataTables } from '../../utils/constants'
import {
    useDispatch as useAppDispatch,
    useSelector
} from '../../redux/store'
import { cardFilter, ChangePage, filterData, loadDisputes, searchData, sortData, ClmSearch, removeCLmFilter, clearAllfilter, loadDisputesDetails } from '../../redux/slices/billingTicketSlice'
import useLocales from '../../hooks/useLocales'
import Invoice from '../common/icons/invoice'
import Card from '../common/elements/card'
import { getCardCount } from '../../utils/helpers'
import { Tooltip } from '@mui/material'
import Ticket from '../common/icons/ticket'
import { PageItems } from '../common/tables/actions/PageItems'
import { DateAction } from '../common/tables/actions/DateAction'
import { ExportTo } from '../common/tables/actions/ExportTo'
import { ChangePagination } from '../common/tables/actions/changePagination'
import TicketSummary from './actionHandlers/TicketSummery'
// import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import HistoryIcon from '@mui/icons-material/History';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { loadServicesDetails } from '../../redux/slices/serviceAssurenceSlice'

import Invoiceicon from '../common/icons/Historyicon';
import Historyicon from '../common/icons/Historyicon';
import ThumbUpOffAltIcon from '../common/icons/ThumbUpOffAltIcon'

export const BillingTicket = ({ toggleTheme }: { toggleTheme: any }) => {

    const { PageData = [], MasterData = [], DisputesData, total, page, take, filterValue, downloadCRDInprogress } = useSelector((state: any) => state.billingTicket || {});
    const { dashBoardWidth } = useSelector((state: any) => state.common);
    const [dateRange, setDateRange] = useState<any>([null, null]);
    const getDate = (dateRange: any) => {
        const s = `${new Date(dateRange).toLocaleDateString()}`.split("/");
        return `${s[2]}-${s[0]}-${s[1]}`
    }
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadDisputes({
            searchValue: "",
            ...dateRange[0] != null && { fromDate: getDate(dateRange[0]) },
            ...dateRange[1] != null && { toDate: getDate(dateRange[1]) },
        }
        ));
    }, [dispatch, dateRange])
    const { t } = useLocales()
    const cards = [
        { state: 'active', id: "allTickets", titel: t('allTickets'), value: getCardCount(MasterData, apiVrbls.BILLING_TICKET.STATUS, ''), icon: <Invoice />, action: cardFilter(apiVrbls.BILLING_TICKET.STATUS, "") },
        { id: "inprogress", titel: t('inprogress'), value: getCardCount(MasterData, apiVrbls.BILLING_TICKET.STATUS, cardsValues.BILLING_TIKCET.INPROGRESS), icon: <Historyicon />, action: cardFilter(apiVrbls.BILLING_TICKET.STATUS, cardsValues.BILLING_TIKCET.INPROGRESS) },
        { id: "resolve", titel: t('resolve'), value: getCardCount(MasterData, apiVrbls.BILLING_TICKET.STATUS, cardsValues.BILLING_TIKCET.RESOLVED), icon: <ThumbUpOffAltIcon />, action: cardFilter(apiVrbls.BILLING_TICKET.STATUS, cardsValues.BILLING_TIKCET.RESOLVED) },
    ]

    const [showIt, setShowIt] = useState(false);
    const [disputeData, setdisputeData] = useState(null);
    const handleShow = () => {
        setShowIt(!showIt);
    };


    const [attachments, setattachments] = useState<any>([]);
    const { user } = useSelector((state: any) => state.auth || {});

    const RaiseTicketHandler = (item: any) => (<Tooltip title={t<string>('View Ticket')}>
        <button className="actionButton__item" onClick={() => {
            dispatch(loadDisputesDetails({ emailId: user[apiVrbls.USER.EMAIL_ID], ticketId: item.item[apiVrbls.BILLING_TICKET.MODULE.DISPUTE_ID] }, (data: any) => {
                if (data.data) {
                    if (data.attachments) {
                        setattachments(data.attachments)
                    }
                    setdisputeData(data.data)
                    setShowIt(!showIt);
                } else {
                    // handle error case
                }
            }))
        }} >
            <span>
                {' '}
                <TextSnippetIcon color='action' />{' '}
            </span>
        </button>
    </Tooltip>)

    return (
        <div >
            {showIt && <TicketSummary attachments={attachments} disputeData={disputeData} handleShow={handleShow} showIt={showIt} />}
            <div className="Layout__content" id="main-div-element" style={{
                marginLeft: `${dashBoardWidth}`, width: `calc(100% - ${dashBoardWidth}.split('p')[0]}px`
            }}>
                <div className="content__header">
                    <BreadCrums data={breadCrums.BILLING_TICKETS} />
                    <PageSearch searchFn={searchData} searchPlaceholder='billingTicketPlaceHolder' />
                </div>
                <div id="main-div" className="card-wrapper-1">
                    {cards.map((q: any, i: any) => <Card className="billingTicket" cardData={cards} data={q} key={i} />)}
                </div >
                {/* Action items */}
                <div className="action__elements">
                    <PageItems pageAction={ChangePage} pagination={{ take, total, page }} />
                    <DateAction setDateRange={setDateRange} dateRange={dateRange}></DateAction>
                    <ExportTo allMasterData={PageData} tableName={"billing tickets"} />
                </div>
                <DataTable
                    sortAction={sortData}
                    filterAction={filterData}
                    clearFilterClm={removeCLmFilter}
                    filterValues={filterValue}
                    ClmSearch={ClmSearch}
                    clearAllfilter={clearAllfilter}
                    TableData={dataTables.BILLING_TICKET(PageData, MasterData, RaiseTicketHandler)} />
                <ChangePagination pageAction={ChangePage} pagination={{ take, total, page }} />
            </div>
            {/* <ModalTicketError /> */}
        </div>
    )
}

export default BillingTicket
