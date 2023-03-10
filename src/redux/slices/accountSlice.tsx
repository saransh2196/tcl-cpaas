import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../store'
import { account } from '../../services/api/index'
import { slices } from '../../utils/constants'
import { toast } from 'react-toastify'

const initialState: any = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    accountDetails: null,
    updateUser: ""
}

export const accountSlice = createSlice({
    name: slices.ACCOUNT_SLICE,
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        hasError(state) {
            state.isLoading = false
            state.isError = true
        },
        getDetails: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.accountDetails = action.payload
        },
        updateDetails: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.updateUser = action.payload
        }
    },
})

// billingSlice
export default accountSlice.reducer

// actions
export const { startLoading, hasError } = accountSlice.actions

// -----------------------------------------------------------------
export const getAcDetails = () => {
    return async () => {
        try {
            const { data } = await account.getAccountDetails();
            if (data && data.length > 0) {
                dispatch(accountSlice.actions.getDetails(data[0]))
            } else {
                dispatch(accountSlice.actions.hasError())
            }
        } catch (error) {
            dispatch(accountSlice.actions.hasError())
        }
    }
}


export const updateUserDetails = (body: any) => {
    return async () => {
        try {
            const { data } = await account.editUserDetails(body)
            if (data) {
                toast.success(data.data.message)
                dispatch(accountSlice.actions.updateDetails(data))
            } else {
                dispatch(accountSlice.actions.hasError())
            }
            return data
        } catch (error) {
            dispatch(accountSlice.actions.hasError())
        }
    }
}
