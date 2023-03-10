import { createSlice } from '@reduxjs/toolkit'
import { dispatch, store } from '../store'
import { slices } from '../../utils/constants'

const initialState: any = {
    dashBoardWidth: "160px",
    loading: false,
}

export const commonSlice = createSlice({
    name: slices.COMMON_SLICE,
    initialState,
    reducers: {
        upddatewidth(state, action) {
            state.dashBoardWidth = action.payload
        },
        setLoader(state, action) {
            state.loading = action.payload
        }
    },
})
// billingSlice
export default commonSlice.reducer

// actions

export const updateWidth = () => {
    return async () => {
        const currentWidth = store.getState().common.dashBoardWidth == '160px' ? '300px' : '160px';
        dispatch(commonSlice.actions.upddatewidth(currentWidth))
    }
}

export const setLoader = (status: any) => {
    return async () => {
        dispatch(commonSlice.actions.setLoader(status))
    }
}

export const reset = () => {
    return async () => {
        dispatch(commonSlice.actions.upddatewidth('160px'))
    }
}