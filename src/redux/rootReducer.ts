import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

// slices
import authReducer from './slices/authSlice'
import billingReducer from './slices/billingSlice'
import accountReducer from './slices/accountSlice'
import commonReducer from './slices/commonSlice'
import userManagmentReducer from './slices/userManagmentSlice'
import billingTicketSlice from './slices/billingTicketSlice'
import serviceAssurenceSlice from './slices/serviceAssurenceSlice'


// =================================

const encryptor = encryptTransform({
  secretKey: '123456',
  onError: (err) => {
    console.log('err', err)
  },
})

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  transforms: [encryptor],
}

const rootReducer = combineReducers({
  auth: authReducer,
  billing: billingReducer,
  account: accountReducer,
  common: commonReducer,
  userManagemnt: userManagmentReducer,
  billingTicket: billingTicketSlice,
  serviceAssurence:serviceAssurenceSlice
})

export { rootPersistConfig, rootReducer }
