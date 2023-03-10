import { createSlice } from '@reduxjs/toolkit'
import { dispatch, store } from '../store'
import { billing } from '../../services/api/index'
import { slices } from '../../utils/constants'
import { getFilterConditons, getPageParms, searchArray, setUlrParms, sortArray } from '../../utils/helpers'
import axios from 'axios'
import routes from '../../services/api/routes'
import { removeFromLocalStorage } from '../../hooks/useLocalStorage'

const initialState: any = {
    MasterData: [],
    invoiceData: [],
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
    downloadCRDInprogress: false
}

export const billingSlice = createSlice({
    name: slices.BILLING_SLICE,
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        hasError(state) {
            state.isLoading = false
            state.isError = true
        },
        loadInvoices: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.invoiceData = action.payload.data
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
            state.invoiceData = action.payload.invocieData
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
        },
        setdownloadCRDInprogress: (state, action) => {
            state.downloadCRDInprogress = action.payload
        }
    },
})

// billingSlice
export default billingSlice.reducer

// actions
export const { startLoading, hasError } = billingSlice.actions

// -----------------------------------------------------------------


export const updateCal = (status: any) => {
    return async () => {
        dispatch(billingSlice.actions.setCalStatus({ status }))
    }
}
export const runFilters = ({ page, take, sort }: any) => {
    return async () => {
        const { invoiceData, searchValue, filterValue = [] } = store.getState().billing || {};
        let filteredData: any = []
        const con = getFilterConditons(filterValue);
        if (sort) {
            const dm = JSON.parse(JSON.stringify(invoiceData))
            filteredData = sortArray(dm, sort.eleName, sort.dr);

            dispatch(billingSlice.actions.setSortData({ invocieData: filteredData, sortElement: sort.eleName }))
        } else {
            filteredData = JSON.parse(JSON.stringify(invoiceData));
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
        dispatch(billingSlice.actions.setFilterData(d))
        setUlrParms(page, take)
    }
}


export const loadInvoices = (parms: any) => {
    return async () => {
        try {
            const { data } = await billing.loadInvoices(parms)
            const d = data.result_data.Invoices
            if (data) {
                dispatch(billingSlice.actions.loadInvoices({ data: d }));
                const pg = getPageParms(d.length)
                if (parms.toDate == null) {
                    dispatch(ChangePageBilling(pg.curr, pg.take));
                } else {
                    dispatch(billingSlice.actions.setpageData({ data: [], page: 1, take: 10 }))
                    dispatch(ChangePageBilling(1, pg.take));
                }
            } else {
                dispatch(billingSlice.actions.hasError())
                dispatch(billingSlice.actions.loadInvoices({ data: [] }))
                dispatch(billingSlice.actions.setpageData({ data: [], page: 1, take: 10 }))
            }
            return d
        } catch (error) {
            dispatch(billingSlice.actions.hasError())
            dispatch(billingSlice.actions.loadInvoices({ data: [] }))
            dispatch(billingSlice.actions.setpageData({ data: [], page: 1, take: 10 }))
        }
    }
}


export const raiseTicketApiCall = (body: any, clbk: any) => {
    return async () => {
        try {
            const { data } = await billing.raiseRicket(body);
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

export const viewInvoice = (id: any) => {
    return async () => {
        try {
            const response = await billing.viewInvoice(id)
            const d = response.data.Invoices
            if (response) {
                dispatch(billingSlice.actions.loadInvoices({ data: d }))
                const pg = getPageParms(d.length)
                dispatch(ChangePageBilling(pg.curr, pg.take))
            } else {
                dispatch(billingSlice.actions.hasError())
                dispatch(billingSlice.actions.loadInvoices({ data: [] }))
                dispatch(billingSlice.actions.setpageData({ data: [], page: 1, take: 10 }))
            }
            return d
        } catch (error) {
            dispatch(billingSlice.actions.hasError())
            dispatch(billingSlice.actions.loadInvoices({ data: [] }))
            dispatch(billingSlice.actions.setpageData({ data: [], page: 1, take: 10 }))
        }
    }
}
export const downloadBillingInvoice = (data: any, calback: any) => {
    dispatch(billingSlice.actions.startLoading())
    return async () => {
        const response = await billing.downloadInvoice(data)
        if (response) {
            const filename = "BillingInvoice_" + data.invoiceNumber + ".pdf";
            // window.open(URL.createObjectURL(response.data));
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); //or any other extension
            document.body.appendChild(link);
            link.click();
            calback(false)
        } else {
            calback(true)
        }
    }
}

export const viewBillingInvoice = (data: any) => {
    dispatch(billingSlice.actions.startLoading())
    return async () => {
        const response = await billing.downloadInvoiceCdr(data)
        if (response) {
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            //window.open(URL.createObjectURL(response.data));
        }
    }
}


export const downloadBillingInvoiceCDR = (data: any, callBack: any) => {
    dispatch(billingSlice.actions.setdownloadCRDInprogress(true));
    try {
        return async () => {
            const response = await billing.downloadInvoiceCdr(data)
            if (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
                callBack(false);
                dispatch(billingSlice.actions.setdownloadCRDInprogress(false));
            } else {
                callBack(true);
                dispatch(billingSlice.actions.setdownloadCRDInprogress(false));
            }
        }
    } catch {
        callBack(true);
        dispatch(billingSlice.actions.setdownloadCRDInprogress(false));
    }

}

export const cardFilter = (element: any, value: any) => {
    const detailsOfBilling = store.getState().billing || {};
    const { take } = detailsOfBilling
    return async () => {
        const f = [{ element: element, values: [value] }]
        dispatch(billingSlice.actions.setFilterParms({ filterValue: f }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}

export const ClmSearch = (element: any, value: any) => {
    const detailsOfBilling = store.getState().billing || {};
    const { take, filterValue = [] } = detailsOfBilling
    return async () => {
        const f = JSON.parse(JSON.stringify(filterValue));
        if (filterValue.filter((a: any) => a.element == element).length > 0) {
            const p = f.findIndex((a: any) => a.element == element);
            f[p] = { element: element, values: [value] };
        } else {
            f.push({ element: element, values: [value] })
        }
        dispatch(billingSlice.actions.setFilterParms({ filterValue: f }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}





export const removeCLmFilter = (element: any) => {
    const detailsOfBilling = store.getState().billing || {};
    const { take, filterValue = [] } = detailsOfBilling
    return async () => {
        const f = JSON.parse(JSON.stringify(filterValue));
        if (filterValue.filter((a: any) => a.element == element).length > 0) {
            const p = f.findIndex((a: any) => a.element == element);
            f[p] = { element: element, values: [] };
        }
        dispatch(billingSlice.actions.setFilterParms({ filterValue: f }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}

export const clearAllfilter = () => {
    const detailsOfBilling = store.getState().billing || {};
    const { take, filterValue = [] } = detailsOfBilling
    return async () => {

        dispatch(billingSlice.actions.setFilterParms({ filterValue: [] }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}

export const ChangePageBilling = (page: any, take: any) => {
    return async () => {
        dispatch(runFilters({ page, take, sort: false }))
    }
}

export const searchData = (searchValue: any) => {
    const detailsOfBilling = store.getState().billing || {};
    const { take } = detailsOfBilling
    return async () => {
        dispatch(loadInvoices({ searchValue: searchValue }));
        // dispatch(billingSlice.actions.setSearchData({ searchValue }))
        // dispatch(runFilters({ page: 1, take, sort: false }))
    }
}
export const sortData = (Field: any, dr: any) => {
    const { eleName } = Field;
    const detailsOfBilling = store.getState().billing || {};
    const { take } = detailsOfBilling
    setUlrParms(1, take)
    return async () => {
        dispatch(runFilters({ page: 1, take, sort: { eleName, dr } }))
    }
}

export const filterData = (element: any, value: any, checked: any) => {
    const { filterValue = [], take } = store.getState().billing || {};
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
            dispatch(billingSlice.actions.setFilterParms({ filterValue: finalObj }))
        } else {
            dispatch(billingSlice.actions.setFilterParms({ filterValue: [...filterValue, fild[0]] }))
        }
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}
