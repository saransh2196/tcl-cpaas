import axios from 'axios'
import { getFromLocalStorage } from '../../hooks/useLocalStorage'
import { logout } from '../../redux/slices/authSlice'
import { setLoader } from '../../redux/slices/commonSlice'
import { store, dispatch } from '../../redux/store'
import { Password } from '../../types/authType'
import { apiHelpers, apiRoutes, apiVrbls, appRoutes, localStorageVar } from '../../utils/constants'
import { setRefreshTokens } from '../../utils/helpers'
import {
  billingTransformer,
  forgotPasswordTransformer,
  loginTransformer,
  logoutTransformer,
  resetPasswordTransformer,
  userInfoTransformer,
  refrshTokenTransformer,
  changePasswordTransformer,
  getuserListtransformer,
  adduSertransfomer,
  getlegalEntityListTrans,
  getserviceTrans,
  getModuleTrans,
  getDisputesTransformer,
  getdisputeDetailstransformer,
  editUsertransfomer,
  getAccountDetilsTransformer,
  raiseTicketTransformer,
  getSnowTicetsTransformer,
  getTicketDetailstransformer,
  RaiseticketServiceAsstransfor,
  serviceAssAttachmentsTransformer
} from '../../utils/transformers'
import routes from './routes'

const excludeULS = [apiRoutes.REFRESH_TOKEN, apiRoutes.LOGIN, apiRoutes.LOGOUT];
const excludeForLoader = [apiRoutes.DOWNLOAD_INVOICES_CDR];


const httpInstance = (transformer: any) => {
  const Inst = axios.create({
    baseURL: routes.BASE_URL,
    ...(transformer && { transformResponse: [transformer] }),
    headers: {
      [apiHelpers.HEADER_CONTENT_TYPE]: apiHelpers.CONTENT_TYPE_APP_JSON,
      [apiHelpers.HEADER_AUTHORIZATION]: `${apiHelpers.TOKEN_TYPE} ${getFromLocalStorage(localStorageVar.TOKEN_VAR) || null
        }`,
    },
  });


  Inst.interceptors.request.use((config) => {
    if (!excludeForLoader.map((u) => `${config.baseURL}${u}`).includes(`${config.url}`)) {
      dispatch(setLoader(true))
    }
    return config;
  }, (error) => {
    dispatch(setLoader(false))
    return Promise.reject(error);
  });


  // Interceptor for session managment
  Inst.interceptors.response.use(
    // returning if success response
    (response: any) => {
      dispatch(setLoader(false))
      return response
    },
    async (error) => {
      // Handling error response
      try {
        // checking api url should exclude interceptor or not
        if (!excludeULS.map((u) => `${error.config.baseURL}${u}`).includes(error.config.url)) {

          // checking for unauthorized error 401
          if (error.response.status === 401) {

            // if unauthorized calling the refresh token to get new access token
            const refreshCall = await userLoginData.refreshToken({
              refreshToken: getFromLocalStorage(localStorageVar.REFRESH_TOKEN),
              username: store.getState().auth.user[apiVrbls.USER.EMAIL_ID]
            });

            // checking the response for refresh token
            if (refreshCall.status === 200) {

              // if refresh token resonse valid then setting new access tokens to local storage with promise function
              setRefreshTokens(refreshCall.data).then(() => {

                // after setting tokens to local storage updating tokens in base request
                error.config.headers = {
                  [apiHelpers.HEADER_AUTHORIZATION]: `${apiHelpers.TOKEN_TYPE} ${getFromLocalStorage(localStorageVar.TOKEN_VAR) || null}`,
                };

                // calling the base request again with new token
                return Inst.request(error.config);
              }).catch(() => {
                dispatch(setLoader(false))
                // if something wronf with setting the tokens to local storage then logout
                dispatch(logout())
              });
            } else {
              dispatch(setLoader(false))
              // if refresh token response not 200 then logout
              dispatch(logout())
            }
          } else {
            dispatch(setLoader(false))
            // if error is not 401 then return same error it will handle in transformer and slice level
            return Promise.reject(error);
          }
        } else {
          dispatch(setLoader(false))
          // if req URL is excludable then returning the error
          return Promise.reject(error);
        }
      } catch {
        dispatch(setLoader(false))
        return Promise.reject(error);
      }


    });

  return Inst
}


const requests = {
  get: (url: string, transformer: any) => httpInstance(transformer).get(url),
  post: (url: string, body: any, transformer: any) =>
    httpInstance(transformer).post(url, body),
  patch: (url: string, body: Password) => httpInstance(null).patch(url, body),
  put: (url: string, body: any) => httpInstance(null).put(url, body),
  postPdf: (url: string, data: any, transformer: any) =>
    httpInstance(transformer).get(url, {
      responseType: 'blob',
      headers: { [apiHelpers.HEADER_CONTENT_TYPE]: apiHelpers.CONTENT_TYPE_APP_PDF },
    }),
  postFile: (url: string, data: any, transformer: any) =>
    httpInstance(transformer).post(url, data, {
      headers: { [apiHelpers.HEADER_CONTENT_TYPE]: apiHelpers.MULTIPART },
    }),
}


const userLoginData = {
  login: (body: any) =>
    requests.post(`${routes.BASE_URL}${routes.LOGIN}`, body, loginTransformer),
  refreshToken: (body: any) =>
    requests.post(`${routes.BASE_URL}${routes.REFRESH_TOKEN}`, body, refrshTokenTransformer),
  logout: (bdy: any) =>
    requests.post(`${routes.BASE_URL}${routes.LOGOUT}`, bdy, logoutTransformer),
  updatePassword: (body: Password) =>
    requests.post(`${routes.BASE_URL}${routes.SET_PASSWORD}`, body, null),
  forgotPassword: (body: any) =>
    requests.post(
      `${routes.BASE_URL}${routes.FORGOT_PASSWORD}`,
      body,
      forgotPasswordTransformer
    ),
  resetPassword: (body: any) =>
    requests.post(
      `${routes.BASE_URL}${routes.RESET_PASSWORD}`,
      body,
      resetPasswordTransformer
    ),
  changePassword: (body: any) =>
    requests.post(
      `${routes.BASE_URL}${routes.CHANGE_PASSWORD}`,
      body,
      changePasswordTransformer
    ),
  getUserInfo: (emailId: any) =>
    requests.get(
      `${routes.BASE_URL}${routes.GET_USER_INFO}?username=${emailId}`,
      userInfoTransformer
    ),
}

const billing = {
  loadInvoices: (data: any) =>
    requests.get(
      `${routes.BASE_URL}${routes.GET_INVOICES}?${data.searchValue != '' ? `q=${data.searchValue}` : ''}${data.fromDate ? `&fromDate=${data.fromDate}` : ''}${data.toDate ? `&toDate=${data.toDate}` : ''}`,
      billingTransformer
    ),
  viewInvoice: (data: any) =>
    requests.get(`${routes.BASE_URL}${routes.VIEW_INVOICES}`, null),
  downloadInvoice: (data: any) =>
    requests.postPdf(
      `${routes.BASE_URL}${routes.DOWNLOAD_INVOICES}`,
      data,
      null
    ),
  downloadInvoiceCdr: (data: any) =>
    requests.postPdf(
      `${routes.BASE_URL}${routes.DOWNLOAD_INVOICES_CDR}`,
      data,
      null
    ),

  raiseRicket: (data: any) =>
    requests.post(
      `${routes.BASE_URL}${routes.RAISE_DISPUTE}`,
      data,
      raiseTicketTransformer
    ),
}


const userManagemnt = {
  loadUsers: (data: any) =>
    requests.get(
      `${routes.BASE_URL}${routes.GET_USERS_LIST}?${data.searchValue != '' ? `q=${data.searchValue}` : ''}${data.fromDate ? `&fromDate=${data.fromDate}` : ''}${data.toDate ? `&toDate=${data.toDate}` : ''}`,
      getuserListtransformer
    ),

  addUser: (body: any) => requests.post(`${routes.BASE_URL}${routes.ADD_USER}`, body, adduSertransfomer),
  edituser: (body: any) => requests.post(`${routes.BASE_URL}${routes.UPDATE_USER_INFO}`, body, editUsertransfomer),
  getlegalEntityList: (body: any) =>
    requests.get(`${routes.BASE_URL}${routes.legalEntityList}`, getlegalEntityListTrans),

  getservicesList: (body: any) =>
    requests.get(`${routes.BASE_URL}${routes.servicesList}`, getserviceTrans),

  getModulesList: (body: any) =>
    requests.get(`${routes.BASE_URL}${routes.moduleslist}`, getModuleTrans),
}


const billingTickets = {
  loadDisputes: (data: any) =>
    requests.get(
      `${routes.BASE_URL}${routes.GET_DISPUTES}?${data.searchValue != '' ? `q=${data.searchValue}` : ''}${data.fromDate ? `&fromDate=${data.fromDate}` : ''}${data.toDate ? `&toDate=${data.toDate}` : ''}`,
      getDisputesTransformer
    ),

  getDisputeDetails: (body: any) =>
    requests.post(
      `${routes.BASE_URL}${routes.GET_DISPUTE_DETAILS}`, body,
      getdisputeDetailstransformer
    ),
}

const serviceAssurence = {
  loadServices: (data: any) =>
    requests.get(
      `${routes.BASE_URL}${routes.GET_SERVICE_ASSU}?${data.searchValue != '' ? `q=${data.searchValue}` : ''}${data.fromDate ? `&fromDate=${data.fromDate}` : ''}${data.toDate ? `&toDate=${data.toDate}` : ''}`,
      getSnowTicetsTransformer
    ),

  getServiceDetails: (body: any) =>
    requests.post(
      `${routes.BASE_URL}${routes.GET_SERVICE_DETAILS}`, body,
      getTicketDetailstransformer
    ),

  downloadAttachment: (ticketid: any, atachmentid: any) =>
    requests.postPdf(
      `${routes.BASE_URL}${routes.DOWNLOAD_ATTACHMENT(ticketid, atachmentid)}`, null,
      null
    ),
  raiseRicket: (data: any) =>
    requests.post(
      `${routes.BASE_URL}${routes.CREATE_TICKET}`,
      data,
      RaiseticketServiceAsstransfor
    ),

  createAtachment: (data: any) =>
    requests.postFile(
      `${routes.BASE_URL}${routes.CREATE_ATACHMENT}`,
      data,
      null
    ),

  getAttachments: (ticketid: any) =>
    requests.get(
      `${routes.BASE_URL}${routes.GETATTACHMENTS(ticketid)}`,
      serviceAssAttachmentsTransformer
    ),
}

const account = {
  getAccountDetails: () =>
    requests.get(`${routes.BASE_URL}${routes.GET_ACCOUNT_BILLING_DETAILS}`, getAccountDetilsTransformer),
  editUserDetails: (body: any) =>
    requests.post(`${routes.BASE_URL}${routes.UPDATE_USER_INFO}`, body, null),



}

export { userLoginData, billing, account, userManagemnt, billingTickets, serviceAssurence }
