import { useEffect, useState } from 'react'
import RaiseTicket from './actionHandlers/RaiseTicket'
import DataTable from '../common/tables/DataTables'
import { BreadCrums } from '../common/elements/BreadCrum'
import { PageSearch } from '../common/elements/PageSearch'
import { apiVrbls, breadCrums, cardsValues, dataTables } from '../../utils/constants'
import {
    useDispatch as useAppDispatch,
    useSelector
} from '../../redux/store'
import { cardFilter, ChangePageBilling, viewBillingInvoice, downloadBillingInvoice, downloadBillingInvoiceCDR, filterData, loadInvoices, searchData, sortData, ClmSearch, removeCLmFilter, clearAllfilter } from '../../redux/slices/billingSlice'
import useLocales from '../../hooks/useLocales'
import Invoice from '../common/icons/invoice'
import Overdue from '../common/icons/overdue'
import PaidInvoice from '../common/icons/paidInvoice'
import UnpaidInvoice from '../common/icons/unpaidInvoice'
import Card from '../common/elements/card'
import { getCardCount } from '../../utils/helpers'
import { Tooltip } from '@mui/material'
import Pdf from '../common/icons/pdf'
import Ticket from '../common/icons/ticket'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadActions from './actionHandlers/DownloadActions'
import { PageItems } from '../common/tables/actions/PageItems'
import { DateAction } from '../common/tables/actions/DateAction'
import { ExportTo } from '../common/tables/actions/ExportTo'
import { ChangePagination } from '../common/tables/actions/changePagination'
import ModalTicketRaised from '../modals/ModalTicketRaised'

export const Billing = ({ toggleTheme }: { toggleTheme: any }) => {

    const { PageData = [], MasterData = [], total, page, take, filterValue, downloadCRDInprogress } = useSelector((state: any) => state.billing || {});
    const { dashBoardWidth } = useSelector((state: any) => state.common);

    const [dateRange, setDateRange] = useState<any>([null, null]);
    const getDate = (dateRange: any) => {
        const s = `${new Date(dateRange).toLocaleDateString()}`.split("/");
        return `${s[2]}-${s[0]}-${s[1]}`
    }
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadInvoices({
            searchValue: "",
            ...dateRange[0] != null && { fromDate: getDate(dateRange[0]) },
            ...dateRange[1] != null && { toDate: getDate(dateRange[1]) },
        }
        ));
    }, [dispatch, dateRange])
    const { t } = useLocales()
    const cards = [
        { state: 'active', titel: t('allInvoice'), value: getCardCount(MasterData, apiVrbls.BILLING.PAY_STATUS, ''), icon: <Invoice />, action: cardFilter(apiVrbls.BILLING.PAY_STATUS, "") },
        { titel: t('overdue'), value: getCardCount(MasterData, apiVrbls.BILLING.PAY_STATUS, cardsValues.BILLING_INVOICE.OVERDUE), icon: <Overdue />, action: cardFilter(apiVrbls.BILLING.PAY_STATUS, cardsValues.BILLING_INVOICE.OVERDUE) },
        { titel: t('unpaidInvoices'), value: getCardCount(MasterData, apiVrbls.BILLING.PAY_STATUS, cardsValues.BILLING_INVOICE.PENDING), icon: <UnpaidInvoice />, action: cardFilter(apiVrbls.BILLING.PAY_STATUS, cardsValues.BILLING_INVOICE.PENDING) },
        { titel: t('paidInvoices'), value: getCardCount(MasterData, apiVrbls.BILLING.PAY_STATUS, cardsValues.BILLING_INVOICE.COMPLETED), icon: <PaidInvoice />, action: cardFilter(apiVrbls.BILLING.PAY_STATUS, cardsValues.BILLING_INVOICE.COMPLETED) },
    ]

    const [showIt, setShowIt] = useState(false);
    const handleShow = () => {
        setShowIt(!showIt);
    };



    const viewPdfHandler = (item: any) => (<Tooltip title={t<string>('viewInvoice')}>
        <button className="actionButton__item" onClick={() => { dispatch(viewBillingInvoice(item)) }} >
            <span>
                {' '}
                <Pdf />{' '}
            </span>
        </button>
    </Tooltip>)

    const [selData, SetSelData] = useState(null)
    const RaiseTicketHandler = (item: any) => (<Tooltip title={t<string>('raiseATicket')}>
        <button className="actionButton__item" onClick={() => {
            setShowIt(!showIt);
            SetSelData(item.item)
        }} >
            <span>
                {' '}
                <Ticket />{' '}
            </span>
        </button>
    </Tooltip>)

    const [openSnack, SetOpenSnack] = useState(false);
    const [SnakData, setSnackData] = useState({ Icon: CheckCircleIcon, snackTitel: '', snackText: '' });

    const downlaodHandler = (item: any) => (
        <DownloadActions
            openSnack={openSnack}
            SetOpenSnack={SetOpenSnack}
            item={item}
            inProgress={downloadCRDInprogress}
            downloadCDR={downloadBillingInvoiceCDR}
            downloadPDF={downloadBillingInvoice}
            SnakData={SnakData}
            setSnackData={setSnackData}
        />
    )


    return (
        <div >
            <RaiseTicket handleShow={handleShow} showIt={showIt} data={selData} />
            <div className="Layout__content" id="main-div-element" style={{
                marginLeft: `${dashBoardWidth}`, width: `calc(100% - ${dashBoardWidth}.split('p')[0]}px`
            }}>
                <div className="content__header">
                    <BreadCrums data={breadCrums.BILLING} />
                    <PageSearch searchFn={searchData} searchPlaceholder='searchInvoiceNoEntity' />
                </div>
                <div id="main-div" className="card-wrapper-1">
                    {cards.map((q: any, i: any) => <Card cardData={cards} data={q} key={i} />)}
                </div >
                {/* Action items */}
                <div className="action__elements">
                    <PageItems pageAction={ChangePageBilling} pagination={{ take, total, page }} />
                    <DateAction setDateRange={setDateRange} dateRange={dateRange}></DateAction>
                    <ExportTo allMasterData={PageData} tableName={"billing"} />
                </div>
                <DataTable
                    sortAction={sortData}
                    filterAction={filterData}
                    clearFilterClm={removeCLmFilter}
                    filterValues={filterValue}
                    ClmSearch={ClmSearch}
                    clearAllfilter={clearAllfilter}
                    TableData={dataTables.BILLING(PageData, MasterData, viewPdfHandler, RaiseTicketHandler, downlaodHandler)} />
                <ChangePagination pageAction={ChangePageBilling} pagination={{ take, total, page }} />

            </div>
            {/* <ModalTicketError /> */}
        </div>
    )
}

export default Billing
