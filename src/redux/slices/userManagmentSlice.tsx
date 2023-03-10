import { createSlice } from '@reduxjs/toolkit'
import { dispatch, store } from '../store'
import { userManagemnt } from '../../services/api/index'
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
    downloadCRDInprogress: false,
    legalEntitiesInputs: [],
    servicesInputs: [],
    modulesInputs: [],
}
const serviceMetadata = [
    {
        "id": 1,
        "name": "SMS"
    }, {
        "id": 2,
        "name": "VOICE"
    }
];

const moduleMetadata = [{
    "id": 1,
    "name": "Billing Ticketing"
},
{
    "id": 2,
    "name": "Billing Invoice"
},
{
    "id": 3,
    "name": "Service Assurance"
}
]
export const userManagemntSlie = createSlice({
    name: slices.USER_MANAGMENT_SLICE,
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        hasError(state) {
            state.isLoading = false
            state.isError = true
        },
        addLegalEntities(state, action) {
            state.legalEntitiesInputs = action.payload
        },
        addService(state, action) {
            state.servicesInputs = action.payload
        },
        addModules(state, action) {
            state.modulesInputs = action.payload
        },
        loadUsers: (state, action) => {
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

// userManagemntSlie
export default userManagemntSlie.reducer

// actions
export const { startLoading, hasError } = userManagemntSlie.actions

// -----------------------------------------------------------------


export const updateCal = (status: any) => {
    return async () => {
        dispatch(userManagemntSlie.actions.setCalStatus({ status }))
    }
}
export const runFilters = ({ page, take, sort }: any) => {
    return async () => {
        const { invoiceData, searchValue, filterValue = [] } = store.getState().userManagemnt || {};
        let filteredData: any = []
        const con = getFilterConditons(filterValue);
        if (sort) {
            const dm = JSON.parse(JSON.stringify(invoiceData))
            filteredData = sortArray(dm, sort.eleName, sort.dr);

            dispatch(userManagemntSlie.actions.setSortData({ invocieData: filteredData, sortElement: sort.eleName }))
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
        dispatch(userManagemntSlie.actions.setFilterData(d))
        setUlrParms(page, take)
    }
}


export const loadUsers = (parms: any) => {
    return async () => {
        try {
            const { data } = await userManagemnt.loadUsers(parms);
            if (data && data.length > 0) {
                dispatch(userManagemntSlie.actions.loadUsers({ data: data }));
                const pg = getPageParms(data.length)
                if (parms.toDate == null) {
                    dispatch(ChangePageusers(pg.curr, pg.take));
                } else {
                    dispatch(userManagemntSlie.actions.setpageData({ data: [], page: 1, take: 10 }))
                    dispatch(ChangePageusers(1, pg.take));
                }
            } else {
                dispatch(userManagemntSlie.actions.hasError())
                dispatch(userManagemntSlie.actions.loadUsers({ data: [] }))
                dispatch(userManagemntSlie.actions.setpageData({ data: [], page: 1, take: 10 }))
            }
            return data
        } catch (error) {
            dispatch(userManagemntSlie.actions.hasError())
            dispatch(userManagemntSlie.actions.loadUsers({ data: [] }))
            dispatch(userManagemntSlie.actions.setpageData({ data: [], page: 1, take: 10 }))
        }
    }
}

export const addUser = (body: any, clbk: any) => {
    return async () => {
        try {
            const { data } = await userManagemnt.addUser(body);
            if (data && data == 'SUCCESS') {
                clbk(true);
            } else {
                clbk(false);
            }
        } catch (error) {
            clbk(false);
        }
    }
}

export const edituserapiCall = (body: any, clbk: any) => {
    return async () => {
        try {
            const { data } = await userManagemnt.edituser(body);
            if (data && data == 'SUCCESS') {
                clbk(true);
            } else {
                clbk(false);
            }
        } catch (error) {
            clbk(false);
        }
    }
}


export const loadInputValues = (body: any) => {
    return async () => {
        try {
            const le = await userManagemnt.getlegalEntityList(null);
            // const ser = await userManagemnt.getservicesList(null);
            // const mod = await userManagemnt.getModulesList(null);
            const ser = {
                "data": serviceMetadata,
                "message": "",
                "status": 200
            };

            const mod = {
                "data": moduleMetadata,
                "message": "",
                "status": 200
            };

            if (le.data && le.data.data.length > 0) {
                dispatch(userManagemntSlie.actions.addLegalEntities(le.data.data))
            }

            if (ser.data && ser.data.length > 0) {
                dispatch(userManagemntSlie.actions.addService(ser.data))
            }

            if (mod.data && mod.data.length > 0) {
                dispatch(userManagemntSlie.actions.addModules(mod.data))
            }

        } catch (error) {
            console.log(error);
        }
    }
}


export const cardFilter = (element: any, value: any) => {
    const detailsOfusers = store.getState().userManagemnt || {};
    const { take } = detailsOfusers
    return async () => {
        const f = [{ element: element, values: [value], check: true }]
        dispatch(userManagemntSlie.actions.setFilterParms({ filterValue: f }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}




export const ClmSearch = (element: any, value: any) => {
    const detailsOfusers = store.getState().userManagemnt || {};
    const { take, filterValue = [] } = detailsOfusers
    return async () => {
        const f = JSON.parse(JSON.stringify(filterValue));
        if (filterValue.filter((a: any) => a.element == element).length > 0) {
            const p = f.findIndex((a: any) => a.element == element);
            f[p] = { element: element, values: [value] };
        } else {
            f.push({ element: element, values: [value] })
        }
        dispatch(userManagemntSlie.actions.setFilterParms({ filterValue: f }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}


export const removeCLmFilter = (element: any) => {
    const detailsOfusers = store.getState().userManagemnt || {};
    const { take, filterValue = [] } = detailsOfusers
    return async () => {
        const f = JSON.parse(JSON.stringify(filterValue));
        if (filterValue.filter((a: any) => a.element == element).length > 0) {
            const p = f.findIndex((a: any) => a.element == element);
            f[p] = { element: element, values: [] };
        }
        dispatch(userManagemntSlie.actions.setFilterParms({ filterValue: f }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}

export const clearAllfilter = () => {
    const detailsOfusers = store.getState().userManagemnt || {};
    const { take, filterValue = [] } = detailsOfusers
    return async () => {

        dispatch(userManagemntSlie.actions.setFilterParms({ filterValue: [] }));
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}

export const ChangePageusers = (page: any, take: any) => {
    return async () => {
        dispatch(runFilters({ page, take, sort: false }))
    }
}

export const searchData = (searchValue: any) => {
    const detailsOfusers = store.getState().userManagemnt || {};
    const { take } = detailsOfusers
    return async () => {
        dispatch(loadUsers({ searchValue: searchValue }));
        // dispatch(userManagemntSlie.actions.setSearchData({ searchValue }))
        // dispatch(runFilters({ page: 1, take, sort: false }))
    }
}
export const sortData = (Field: any, dr: any) => {
    const { eleName } = Field;
    const detailsOfusers = store.getState().userManagemnt || {};
    const { take } = detailsOfusers
    setUlrParms(1, take)
    return async () => {
        dispatch(runFilters({ page: 1, take, sort: { eleName, dr } }))
    }
}

export const filterData = (element: any, value: any, checked: any) => {
    const { filterValue = [], take } = store.getState().userManagemnt || {};
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
            dispatch(userManagemntSlie.actions.setFilterParms({ filterValue: finalObj }))
        } else {
            dispatch(userManagemntSlie.actions.setFilterParms({ filterValue: [...filterValue, fild[0]] }))
        }
        dispatch(runFilters({ page: 1, take, sort: false }))
    }
}
