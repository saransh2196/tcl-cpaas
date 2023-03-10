import { createSlice } from '@reduxjs/toolkit'
import { dispatch, store } from '../store'
import { UserLogin, Password, Email, AuthState } from '../../types/authType'
import {
  removeFromLocalStorage,
  setInLocalStorage,
  getFromLocalStorage,
} from '../../hooks/useLocalStorage'
import { userLoginData } from '../../services/api/index'
import { apiDefaultrespons, apiVrbls, localStorageVar, staticErrors, slices } from '../../utils/constants'
import { toast } from 'react-toastify'
import { removeLocalValues } from '../../utils/helpers'

const initialState: AuthState = {
  user: null,
  profile: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  isAuthenticated: false,
  message: '',
  emailSent: '',
  resetmessage: '',
  changeMessage: '',
  forgotMessage: '',
  userEmail: '',
  forgotPassEmail: false,
}

export const userSlice = createSlice({
  name: slices.AUTH_SLICE,
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },
    hasError(state, action) {
      state.isLoading = false
      state.isError = true
      state.isAuthenticated = false
      state.message = action.payload
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.user = action.payload
      state.isAuthenticated = true
      state.message = action.payload.message
    },
    loginCredential: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.userEmail = action.payload
      state.isAuthenticated = true
    },
    setPasswordSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    },
    forgotPasswordSuccess: (state, action) => {
      state.forgotPassEmail = true
      state.isLoading = false
      state.isSuccess = true
      state.emailSent = action.payload.message as string
      state.forgotMessage = action.payload.data
    },
    resetforgotPasswordparms: (state, action) => {
      state.forgotPassEmail = false
    },
    resetLoginParms: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.user = null
      state.isAuthenticated = false
      state.message = ""
    },
    resetPasswordSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.resetmessage = action.payload.data
    },
    changePasswordSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.changeMessage = action.payload.data
    },
    resetChangePasswordSuccess: (state, action) => {
      state.changeMessage = null
    },
    logOutSuccess: (state) => {
      state.isLoading = false
      state.user = null
      state.isAuthenticated = false
      state.changeMessage = null
    },
  },
})

// reducers
export default userSlice.reducer

// actions
export const { startLoading, hasError } = userSlice.actions

// -----------------------------------------------------------------

export const login = (userData: UserLogin, setShowError: any) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      const { data } = await userLoginData.login(userData);
      if (data) {
        const token: any = data.data[apiVrbls.USER.ACCESS_TOKEN];
        if (token) {
          setInLocalStorage(localStorageVar.TOKEN_VAR, token);
          setInLocalStorage(localStorageVar.REFRESH_TOKEN, data.data[apiVrbls.USER.REFRESH_TOKEN]);
        }
        const user = { token: token, email: userData.username }
        const { data: userInfo, message }: any = await userLoginData.getUserInfo(userData.username);
        dispatch(userSlice.actions.resetPasswordSuccess({ data: "" }))
        if (userInfo) {
          dispatch(userSlice.actions.loginSuccess(userInfo))
          dispatch(userSlice.actions.loginCredential(userData))
          setInLocalStorage(localStorageVar.USER_VAR, token)
        } else {
          setShowError(true)
          dispatch(userSlice.actions.hasError(message))
        }
      } else {
        setShowError(true)
        dispatch(userSlice.actions.hasError(data))
      }
    } catch (response: any) {
      setShowError(true)
    }
  }
}

export const getuserInfo = (email: any) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      const { data: userInfo }: any = await userLoginData.getUserInfo(email);
      if (userInfo) {
        dispatch(userSlice.actions.loginSuccess(userInfo))
      } else {
        toast.error(userInfo.message)
      }
    } catch (response: any) {
      const { data = { data: { message: staticErrors.serverInactive } } } = response.response.data;
      toast.error(data.message)
      dispatch(userSlice.actions.hasError(data))
    }
  }
}

export const resetLoginParms = () => {
  return async () => {
    dispatch(userSlice.actions.resetLoginParms(null))
  }
}



export const logout = () => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      const body = {
        refreshToken: `${getFromLocalStorage(localStorageVar.REFRESH_TOKEN)}`,
        username: store.getState().auth?.user ? store.getState().auth.user[apiVrbls.USER.EMAIL_ID] : 'null',
      }
      const { data } = await userLoginData.logout(body)
      dispatch(userSlice.actions.logOutSuccess())
      if (data) {
        toast.success(data.message);
        removeLocalValues();
      } else {
        toast.error(data.message)
        removeLocalValues();
      }
    } catch (response: any) {
      removeLocalValues();
      const { data = { data: { message: staticErrors.serverInactive } } } = response.response.data;
      toast.error(data.message)
      dispatch(userSlice.actions.logOutSuccess())
    }
  }
}


export const updatePassword = (passwordData: Password) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      const response = await userLoginData.updatePassword(passwordData)
      dispatch(userSlice.actions.setPasswordSuccess(response.data))
      return response.data
    } catch (error) {
      dispatch(userSlice.actions.hasError(error))
    }
  }
}

export const forgotPassword = (userEmail: Email) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      const { data } = await userLoginData.forgotPassword(userEmail)
      if (data) {
        dispatch(userSlice.actions.forgotPasswordSuccess(data.data))
        toast.success(data.message)
      } else {
        toast.error(data.message)
        dispatch(userSlice.actions.hasError(null))
      }
    } catch (response: any) {
      const { data = { data: { message: staticErrors.serverInactive } } } = response.response.data;
      toast.error(data.message)
      dispatch(userSlice.actions.hasError(data))
    }
  }
}

export const resetForgotPaswordPrms = () => {
  return async () => {
    dispatch(userSlice.actions.resetforgotPasswordparms(null))
  }
}

export const resetPassword = (body: any) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      const { data } = await userLoginData.resetPassword(body)
      if (data.data) {
        if (data.data == "SUCCESS") {
          toast.success("Password reset successfull");
          dispatch(userSlice.actions.resetPasswordSuccess(data))
        } else {
          toast.success(data.message)
          dispatch(userSlice.actions.hasError(data))
        }
      }
    } catch (response: any) {
      const { data = { data: { message: staticErrors.serverInactive } } } = response.response.data;
      toast.error(data.message)
      dispatch(userSlice.actions.hasError(data))
    }
  }
}


// const resetChangePasswordData = 
export const changePassword = (body: any) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      const { data } = await userLoginData.changePassword(body)
      if (data.data) {
        if (data.data == "SUCCESS") {
          toast.success("Password changed successfull");
          dispatch(userSlice.actions.changePasswordSuccess(data.data))
          // setTimeout((data)=>{
          //   dispatch(userSlice.actions.resetChangePasswordSuccess(data))
          // }, 5000);
        } else {
          toast.success(data.message)
          dispatch(userSlice.actions.hasError(data))
        }
      }
    } catch (response: any) {
      const { data = { data: { message: staticErrors.serverInactive } } } = response.response.data;
      toast.error(data.message)
      dispatch(userSlice.actions.hasError(data))
    }
  }
}


// const resetChangePasswordData = 
export const resetChangePasswordData = (body: any) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      const { data } = await userLoginData.changePassword(body)
      if (data.data) {
        if (data.data.data == "SUCCESS") {
          toast.success("Password changed successfull");
          dispatch(userSlice.actions.changePasswordSuccess(data.data))
          // setTimeout((data)=>{
          //   dispatch(userSlice.actions.resetChangePasswordSuccess(data))
          // }, 5000);
        } else {
          toast.success(data.data.message)
          dispatch(userSlice.actions.hasError(data))
        }
      }
    } catch (response: any) {
      const { data = { data: { message: staticErrors.serverInactive } } } = response.response.data;
      toast.error(data.message)
      dispatch(userSlice.actions.hasError(data))
    }
  }
}
