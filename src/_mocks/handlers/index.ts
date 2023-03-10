import { rest } from 'msw'
import * as authResponse from './auth'
import * as billingInvoiceResponse from './billingInvoice'
import * as billingTicketsResponse from './billingTickets'
import * as serviceAssurance from './serviceassurence'
import * as userManagementResponse from './userManagement'
import { BASE_URL, AUTH_URL, BILLING_INVOICE_URL, USER_MANAGEMENT_URL, BILLING_TICKETING_URL, SERVICE_ASSURENCE } from '../constants/api-routes';

export const handlers = [
    //auth handlers
    rest.post(AUTH_URL.login, authResponse.login),
    rest.get(AUTH_URL.getUserInfo, authResponse.getUserInfo),
    rest.post(AUTH_URL.setPassword, authResponse.setPassword),
    rest.post(AUTH_URL.changePassword, authResponse.changePassword),
    rest.post(AUTH_URL.forgotPassword, authResponse.forgotPassword),
    rest.post(AUTH_URL.logout, authResponse.logout),
    rest.post(AUTH_URL.refreshToken, authResponse.refreshToken),

    // user account
    rest.get(AUTH_URL.getAccountBillingDetails, authResponse.getBillingDetails),
    rest.post(AUTH_URL.updateUserInfo, authResponse.updateUserInfo),

    // billing handlers
    rest.get(BILLING_INVOICE_URL.getInvoices, billingInvoiceResponse.getBillingList),
    rest.get(BILLING_INVOICE_URL.viewInvoice, billingInvoiceResponse.viewInvoice),
    rest.get(BILLING_INVOICE_URL.downloadInvoice, billingInvoiceResponse.viewInvoice),

    // usermanagmnts handlers
    rest.get(USER_MANAGEMENT_URL.getLegalEntityList, userManagementResponse.getLegalEntityList),
    rest.get(USER_MANAGEMENT_URL.getUserList, userManagementResponse.getUsersList),
    rest.post(USER_MANAGEMENT_URL.addUser, userManagementResponse.addUser),

    // billing tickets
    rest.get(BILLING_TICKETING_URL.getDisputeList, billingTicketsResponse.getDisputeList),
    rest.post(BILLING_TICKETING_URL.addDispute, billingTicketsResponse.addDispute),
    rest.post(BILLING_TICKETING_URL.getDisputeById, billingTicketsResponse.getDisputeById),


    // serveic assurence
    rest.get(`${SERVICE_ASSURENCE.gettickets}`, serviceAssurance.getTickets),
    rest.post(`${SERVICE_ASSURENCE.getTicketDetails}`, serviceAssurance.getTicketDetails),
    rest.post(`${SERVICE_ASSURENCE.createTicket}`, serviceAssurance.createTicket),
    rest.post(`${SERVICE_ASSURENCE.createAttachmnet}`, serviceAssurance.createAttachment),
    rest.get(`${SERVICE_ASSURENCE.getAttachments}/:ticketId`, serviceAssurance.getAttachennts),
    rest.get(`${SERVICE_ASSURENCE.downlaodAttachmnet}/:ticketid/:attachmentid`, serviceAssurance.downlaodAttachment),
];