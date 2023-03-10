import { useEffect, useState } from 'react'
import DataTable from '../common/tables/DataTables'
import { BreadCrums } from '../common/elements/BreadCrum'
import { PageSearch } from '../common/elements/PageSearch'
import { apiVrbls, breadCrums, cardsValues, dataTables } from '../../utils/constants'
import {
    useDispatch as useAppDispatch,
    useSelector
} from '../../redux/store'
import { cardFilter, ChangePage, filterData, loadServices, searchData, sortData, ClmSearch, removeCLmFilter, clearAllfilter, loadServicesDetails } from '../../redux/slices/serviceAssurenceSlice'
import useLocales from '../../hooks/useLocales'
import Invoice from '../common/icons/invoice'
import Card from '../common/elements/card'
import { getCardCount } from '../../utils/helpers'
import { Button, Tooltip } from '@mui/material'
import Ticket from '../common/icons/ticket'
import { PageItems } from '../common/tables/actions/PageItems'
import { DateAction } from '../common/tables/actions/DateAction'
import { ExportTo } from '../common/tables/actions/ExportTo'
import { ChangePagination } from '../common/tables/actions/changePagination'
import TicketSummary from './actionHandlers/TicketSummery'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import HistoryIcon from '@mui/icons-material/History';
import RaiseTicket from './actionHandlers/RaiseTicket'
import Download from '../common/icons/download';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
export const ServiceAssurance = ({ toggleTheme }: { toggleTheme: any }) => {

    const { PageData = [], MasterData = [], total, page, take, filterValue, refresh } = useSelector((state: any) => state.serviceAssurence || {});
    const { dashBoardWidth } = useSelector((state: any) => state.common);

    const [dateRange, setDateRange] = useState<any>([null, null]);
    const getDate = (dateRange: any) => {
        const s = `${new Date(dateRange).toLocaleDateString()}`.split("/");
        return `${s[2]}-${s[0]}-${s[1]}`
    }
    const dispatch = useAppDispatch();
    const { user } = useSelector((state: any) => state.auth || {});

    useEffect(() => {
        dispatch(loadServices({
            searchValue: "",
            ...dateRange[0] != null && { fromDate: getDate(dateRange[0]) },
            ...dateRange[1] != null && { toDate: getDate(dateRange[1]) },
        }
        ));
    }, [dispatch, dateRange])
    const { t } = useLocales()
    const cards = [
        { state: 'active', id: "allTickets", titel: t('allTickets'), value: getCardCount(MasterData, apiVrbls.SERVICE_ASSURANCE.STATUS, ''), icon: <Invoice />, action: cardFilter(apiVrbls.SERVICE_ASSURANCE.STATUS, "") },
        { id: "inprogress", titel: t('inprogress'), value: getCardCount(MasterData, apiVrbls.SERVICE_ASSURANCE.STATUS, cardsValues.SERVICE_ASSURENCE.INPROGRESS), icon: <HistoryIcon />, action: cardFilter(apiVrbls.SERVICE_ASSURANCE.STATUS, cardsValues.SERVICE_ASSURENCE.INPROGRESS) },
        { id: "resolve", titel: t('resolve'), value: getCardCount(MasterData, apiVrbls.SERVICE_ASSURANCE.STATUS, cardsValues.SERVICE_ASSURENCE.RESOLVED), icon: <ThumbUpOffAltIcon />, action: cardFilter(apiVrbls.SERVICE_ASSURANCE.STATUS, cardsValues.SERVICE_ASSURENCE.RESOLVED) },
    ]

    const [showIt, setShowIt] = useState(false);
    const [CaseData, setCaseData] = useState(null);
    const [modalOpen, setmodalOpen] = useState(false);
    const [rasieShow, setRaiseShow] = useState(false);
    const handleShow = () => {
        setShowIt(!showIt);
    };
    const [attachments, setattachments] = useState<any>([]);
    const raiseTicketHnd = () => {
        dispatch(loadServices({
            searchValue: "",
            ...dateRange[0] != null && { fromDate: getDate(dateRange[0]) },
            ...dateRange[1] != null && { toDate: getDate(dateRange[1]) },
        }
        ));
        setRaiseShow(!rasieShow)
    };
    const viewTicketHandler = (item: any) => (<Tooltip title={t<string>('View Ticket')}>
        <button className="actionButton__item" onClick={() => {
            dispatch(loadServicesDetails({ emailId: user[apiVrbls.USER.EMAIL_ID], ticketId: item.item[apiVrbls.SERVICE_ASSURANCE.TICKET_NUMBER] }, (data: any) => {
                if (data && data.data) {
                    if (data.attachments) {
                        setattachments(data.attachments)
                    }
                    setCaseData(data.data)
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


    const downlaodtxt = (item: any) => {
        const i = item.item;
        const generatePDF = () => {
            const w: any = window;
            const pdf = new w.jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a5',
                putOnlyUsedFonts: true
            });
            pdf.setFontSize(22);
            pdf.text(`TCL CPAAS - Ticket Detils `, 20, 20);
            pdf.setFontSize(14);
            pdf.text(`Ticket Number : ${i[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.TICKET_ID]}`, 20, 30);
            pdf.text(`Sevice : ${i[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.SERVICE_NAME]}`, 20, 38);
            pdf.text(`Asset ID : ${i[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.ASSET_ID]}`, 20, 46);
            pdf.text(`Issue Type : ${i[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.ISSUE_TYPE]}`, 20, 54);
            pdf.text(`Description : ${i[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.DESCRIPTION]}`, 20, 62);
            pdf.text(`Ticket Raised on : ${i[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.CREATEDDATE]}`, 20, 70);
            pdf.text(`Status : ${i[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.STATUS]}`, 20, 78);
            pdf.setFontSize(20);
            pdf.text(` `, 20, 84);
            pdf.text(`Notes`, 20, 92);
            pdf.setFontSize(8);
            if (i.notes && i.notes.length > 0) {
                let h = 100;
                for (let index = 0; index < i.notes.length; index++) {
                    pdf.text(`${i.notes[index][apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.NOTES.AUTHOR]} (${i.notes[index][apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.NOTES.DATE]})  `, 20, h);
                    pdf.text(`${i.notes[index][apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.NOTES.TEXT]} `, 20, h + 4);
                    h = h + 8;
                }
            }
            pdf.save(`Ticket_${i[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.TICKET_ID]}.pdf`);
        }

        return (<Tooltip title={"download"}>
            <>
                <button className="actionButton__item" onClick={() => {
                    dispatch(loadServicesDetails({ emailId: user[apiVrbls.USER.EMAIL_ID], ticketId: item.item[apiVrbls.SERVICE_ASSURANCE.TICKET_NUMBER] }, (data: any) => {
                        if (data && data.data) {
                            if (data.attachments) {
                                setattachments(data.attachments)
                            }
                            setCaseData(data.data);
                            setTimeout(() => {
                                generatePDF()
                            }, 10);
                        } else {
                            // handle error case
                        }
                    }))
                }} >
                    <span>
                        {' '}
                        <Download />{' '}
                    </span>
                </button>
            </>
        </Tooltip>)
    }

    return (
        <div >
            <TicketSummary attachments={attachments} CaseData={CaseData} handleShow={handleShow} showIt={showIt} />
            <RaiseTicket handleShow={raiseTicketHnd} showIt={rasieShow} setmodalOpen={setmodalOpen} />
            <div className="Layout__content" id="main-div-element" style={{
                marginLeft: `${dashBoardWidth}`, width: `calc(100% - ${dashBoardWidth}.split('p')[0]}px`
            }}>
                <div className="content__header">
                    <BreadCrums data={breadCrums.SERVICE_ASSURENCE} />
                    <PageSearch searchFn={searchData} searchPlaceholder='searchTicketServer' />
                </div>
                <div id="main-div" className="card-wrapper-1">
                    {cards.map((q: any, i: any) => <Card className="serviceAssurance" cardData={cards} data={q} key={i} />)}
                </div >
                {/* Action items */}
                <div className="action__elements">
                    <PageItems pageAction={ChangePage} pagination={{ take, total, page }} />
                    <DateAction setDateRange={setDateRange} dateRange={dateRange}></DateAction>
                    <ExportTo allMasterData={PageData} tableName={"billing tickets"} />
                    <div className='actions__child whiteTicket' style={{ paddingLeft: "20px" }}>
                        <Button onClick={raiseTicketHnd} variant='outlined' startIcon={<Ticket />} className='add_user__btn' >
                            Raise A TICKET
                        </Button>
                    </div>
                </div>
                {refresh && <>
                    <DataTable
                        sortAction={sortData}
                        filterAction={filterData}
                        clearFilterClm={removeCLmFilter}
                        filterValues={filterValue}
                        ClmSearch={ClmSearch}
                        clearAllfilter={clearAllfilter}
                        TableData={dataTables.SERVICE_ASSURENCE(PageData, MasterData, viewTicketHandler, downlaodtxt)} />
                    <ChangePagination pageAction={ChangePage} pagination={{ take, total, page }} />
                </>
                }
            </div>
            {/* <ModalTicketError /> */}
        </div>
    )
}

export default ServiceAssurance
