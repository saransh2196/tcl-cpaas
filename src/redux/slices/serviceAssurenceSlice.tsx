import { createSlice } from '@reduxjs/toolkit'
import { dispatch, store } from '../store'
import { billing, billingTickets, serviceAssurence } from '../../services/api/index'
import { slices } from '../../utils/constants'
import { getFilterConditons, getPageParms, searchArray, setUlrParms, sortArray } from '../../utils/helpers'

const initialState: any = {
    MasterData: [],
    ServiceData: [],
    PageData: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    page: 1,
    take: 10,
    total: 0,
    searchValue: "",
    sortElement: null,
    filterValue: [],
    download: "",
    calOpen: false,
    downlaodStatus: [],
    refresh: true,
}

export const ServiceAssurence = createSlice({
    name: slices.SERVICE_ASSURENCE,
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        hasError(state) {
            state.isLoading = false
            state.isError = true
        },
        setRefresh(state, action) {
            state.refresh = action.payload
        },
        loadServices: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.ServiceData = action.payload.data
            state.MasterData = action.payload.data
            state.total = action.payload.data.length
            state.searchValue = ""
            state.filterValue = []
        },
        setpageData: (state, action) => {
            state.PageData = action.payload.data
            state.page = action.payload.page
            state.take = action.payload.take
        },
        downloadInvoiceData: (state, action) => {
            state.download = action.payload.data
            state.isLoading = false
        },
        setSearchData: (state, action) => {
            state.PageData = action.payload.data
            state.page = action.payload.page
            state.take = action.payload.take
            state.total = action.payload.total
            state.searchValue = action.payload.searchValue
        },
        setSortData: (state, action) => {
            state.sortElement = action.payload.sortElement
            state.ServiceData = action.payload.invocieData
        },
        setFilterParms: (state, action) => {
            state.filterValue = action.payload.filterValue
        },
        setCalStatus: (state, action) => {
            state.calOpen = action.payload.status
        },
        setFilterData: (state, action) => {
            state.PageData = action.payload.data
            state.page = action.payload.page
            state.take = action.payload.take
            state.total = action.payload.total
            state.searchValue = action.payload.searchValue
        }
    },
})

// billingSlice
export default ServiceAssurence.reducer

// actions
export const { startLoading, hasError } = ServiceAssurence.actions

// -----------------------------------------------------------------


export const updateCal = (status: any) => {
    return async () => {
        dispatch(ServiceAssurence.actions.setCalStatus({ status }))
    }
}
export const runFilters = ({ page, take, sort }: any) => {
    return async () => {
        try {
            const { ServiceData, searchValue, filterValue = [] } = store.getState().serviceAssurence || {};
            let filteredData: any = []
            const con = getFilterConditons(filterValue);
            if (sort) {
                const dm = JSON.parse(JSON.stringify(ServiceData))
                filteredData = sortArray(dm, sort.eleName, sort.dr);

                dispatch(ServiceAssurence.actions.setSortData({ invocieData: filteredData, sortElement: sort.eleName }))
            } else {
                filteredData = JSON.parse(JSON.stringify(ServiceData));
            }
            if (con == "" || con == null) {
                filteredData = searchArray(JSON.parse(JSON.stringify(filteredData)), searchValue)
            } else {
                filteredData = searchArray(JSON.parse(JSON.stringify(filteredData)), searchValue).filter((f: any) => {
                    return eval(con)
                })
            }
            const d = {
                data: filteredData?.slice((page - 1) * take, (page * take)),
                page: page,
                take: take,
                total: filteredData?.length,
                searchValue: searchValue
            }
            dispatch(ServiceAssurence.actions.setFilterData(d))
            setUlrParms(page, take)
        } catch (e) {
            console.log(e);

        }

    }
}

export const raiseTicketServiceApiCall = (body: any, clbk: any) => {
    return async () => {
        try {
            const { data } = await serviceAssurence.raiseRicket(body);
            if (data) {
                clbk(true, data);
            } else {
                clbk(false, null);
            }
        } catch (error) {
            clbk(false, null);
        }
    }
}

export const createAtachmentApiCall = (body: any, clbk: any) => {
    return async () => {
        try {
            const { data } = await serviceAssurence.createAtachment(body);
            if (data && data.data && data.data.status == "200") {
                clbk(true, data.data.data);
            } else {
                clbk(false, null);
            }
        } catch (error) {
            clbk(false, null);
        }
    }
}




export const loadServices = (parms: any) => {
    return async () => {
        try {
            const { data } = await serviceAssurence.loadServices(parms)
            const d = data
            if (data) {
                dispatch(ServiceAssurence.actions.loadServices({ data: d }));
                dispatch(ServiceAssurence.actions.setRefresh(false));
                setTimeout(() => {
                    dispatch(ServiceAssurence.actions.setRefresh(true));
                }, 10);
                const pg = getPageParms(d.length)
                if (parms.toDate == null) {
                    dispatch(ChangePage(pg.curr, pg.take));
                } else {
                    dispatch(ServiceAssurence.actions.setpageData({ data: [], page: 1, take: 10 }))
                    dispatch(ChangePage(1, pg.take));
                }
            } else {
                dispatch(ServiceAssurence.actions.hasError())
                dispatch(ServiceAssurence.actions.loadServices({ data: [] }))
                dispatch(ServiceAssurence.actions.setpageData({ data: [], page: 1, take: 10 }))
            }
            return d
        } catch (error) {
            dispatch(ServiceAssurence.actions.hasError())
            dispatch(ServiceAssurence.actions.loadServices({ data: [] }))
            dispatch(ServiceAssurence.actions.setpageData({ data: [], page: 1, take: 10 }))
        }
    }
}


export const loadServicesDetails = (body: any, callback: any) => {
    return async () => {
        try {
            const { data } = await serviceAssurence.getServiceDetails(body);
            const { data: attch } = await serviceAssurence.getAttachments(body.ticketId);
            if (data) {
                callback({
                    data: data,
                    attachments: attch
                });
            } else {
                callback(null);
            }
        } catch (error) {
            callback(null);
        }
    }
}


export const downloadAtachmentService = (ticket: any, attId: any) => {
    return async () => {
        try {
            const response = await serviceAssurence.downloadAttachment(ticket, attId);
            if (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            } else {
            }
        } catch (error) {
            console.log("Error");
        }
    }
}






export const viewInvoice = (id: any) => {
    return async () => {
        try {
            const response = await billing.viewInvoice(id)
            const d = response.data.Invoices
            if (response) {
                dispatch(ServiceAssurence.actions.loadServices({ data: d }))
                const pg = getPageParms(d.length)
                dispatch(ChangePage(pg.curr, pg.take))
            } else {
                dispatch(ServiceAssurence.actions.hasError())
                dispatch(ServiceAssurence.actions.loadServices({ data: [] }))
                dispatch(ServiceAssurence.actions.setpageData({ data: [], page: 1, take: 10 }))
            }
            return d
        } catch (error) {
            dispatch(ServiceAssurence.actions.hasError())
            dispatch(ServiceAssurence.actions.loadServices({ data: [] }))
            dispatch(ServiceAssurence.actions.setpageData({ data: [], page: 1, take: 10 }))
        }
    }
}
export const downloadBillingInvoice = (data: any, calback: any) => {
    dispatch(ServiceAssurence.actions.startLoading())
    return async () => {
        const response = await billing.downloadInvoice(data)
        if (response) {
            // window.open(URL.createObjectURL(response.data));
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
            calback(false)
        } else {
            calback(true)
        }
    }
}

export const viewBillingInvoice = (data: any) => {
    dispatch(ServiceAssurence.actions.startLoading())
    return async () => {
        const response = await billing.downloadInvoice(data)
        if (response) {
            window.open(URL.createObjectURL(response.data));
        }
    }
}


export const cardFilter = (element: any, value: any) => {
    const detailsOfBilling = store.getState().serviceAssurence || {};
    const { take } = detailsOfBilling
    return async () => {
        const f = [{ element: element, values: [value] }]
        dispatch(ServiceAssurence.actions.setFilterParms({ filterValue: f }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}

export const ClmSearch = (element: any, value: any) => {
    const detailsOfBilling = store.getState().serviceAssurence || {};
    const { take, filterValue = [] } = detailsOfBilling
    return async () => {
        const f = JSON.parse(JSON.stringify(filterValue));
        if (filterValue.filter((a: any) => a.element == element).length > 0) {
            const p = f.findIndex((a: any) => a.element == element);
            f[p] = { element: element, values: [value] };
        } else {
            f.push({ element: element, values: [value] })
        }
        dispatch(ServiceAssurence.actions.setFilterParms({ filterValue: f }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}





export const removeCLmFilter = (element: any) => {
    const detailsOfBilling = store.getState().serviceAssurence || {};
    const { take, filterValue = [] } = detailsOfBilling
    return async () => {
        const f = JSON.parse(JSON.stringify(filterValue));
        if (filterValue.filter((a: any) => a.element == element).length > 0) {
            const p = f.findIndex((a: any) => a.element == element);
            f[p] = { element: element, values: [] };
        }
        dispatch(ServiceAssurence.actions.setFilterParms({ filterValue: f }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}

export const clearAllfilter = () => {
    const detailsOfBilling = store.getState().serviceAssurence || {};
    const { take, filterValue = [] } = detailsOfBilling
    return async () => {

        dispatch(ServiceAssurence.actions.setFilterParms({ filterValue: [] }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}

export const ChangePage = (page: any, take: any) => {
    return async () => {
        dispatch(runFilters({ page, take, sort: false }))
    }
}

export const searchData = (searchValue: any) => {
    const detailsOfBilling = store.getState().serviceAssurence || {};
    const { take } = detailsOfBilling
    return async () => {
        dispatch(loadServices({ searchValue: searchValue }));
    }
}
export const sortData = (Field: any, dr: any) => {
    const { eleName } = Field;
    const detailsOfBilling = store.getState().serviceAssurence || {};
    const { take } = detailsOfBilling
    setUlrParms(1, take)
    return async () => {
        dispatch(runFilters({ page: 1, take, sort: { eleName, dr } }))
    }
}

export const filterData = (element: any, value: any, checked: any) => {
    const { filterValue = [], take } = store.getState().serviceAssurence || {};
    let fild = JSON.parse(JSON.stringify(filterValue.filter((e: any) => e.element == element)));
    return async () => {
        let eleFound = false;
        if (fild.length > 0) {
            eleFound = true;
            if (checked == true) {
                fild[0].values.push(value)
            } else {
                fild[0].values.splice(fild[0].values.indexOf(value), 1)
            }
        } else {
            fild = [{ element: element, values: [value], check: true }]
        }
        if (eleFound) {
            const finalObj = JSON.parse(JSON.stringify(filterValue));
            finalObj.filter((e: any) => e.element == element)[0].values = fild[0].values
            dispatch(ServiceAssurence.actions.setFilterParms({ filterValue: finalObj }))
        } else {
            dispatch(ServiceAssurence.actions.setFilterParms({ filterValue: [...filterValue, fild[0]] }))
        }
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}
