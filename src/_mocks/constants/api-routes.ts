function apiPath(baseUrl: string, endPoint: string) {
    return `${baseUrl}${endPoint}`
}

export const BASE_URL = `http://115.112.43.74:8585`;

// auth
export const AUTH_URL = {
    login: apiPath(BASE_URL, '/cpaas/token'),
    logout: apiPath(BASE_URL, '/cpaas/logout'),
    refreshToken: apiPath(BASE_URL, '/cpaas/getAccessTokenFromRefresh'),
    forgotPassword: apiPath(BASE_URL, '/cpaas/forgotPassword'),
    setPassword: apiPath(BASE_URL, '/cpaas/resetPassword'),
    resetPassword: apiPath(BASE_URL, '/cpaas/resetPassword'),
    changePassword: apiPath(BASE_URL, '/cpaas/resetPassword'),
    getUserInfo: apiPath(BASE_URL, '/cpaas/userinfo'),
    updateUserInfo: apiPath(BASE_URL, '/cpaas/updateUserDetails'),
    getAccountBillingDetails: apiPath(BASE_URL, '/ngboss/app/account'),
}

// billing
export const BILLING_INVOICE_URL = {
    getInvoices: apiPath(BASE_URL, '/ngboss/app/invoice/simple'),
    viewInvoice: apiPath(BASE_URL, '/ngboss/app/invoice/view'),
    downloadInvoice: apiPath(BASE_URL, '/ngboss/app/invoice/download'),
    downloadInvoiceCDR: apiPath(BASE_URL, '/ngboss/app/invoice/view'),
}

// usermanagmnts
export const USER_MANAGEMENT_URL = {
    getUserList: apiPath(BASE_URL, '/cpaas/getUsers'),
    addUser: apiPath(BASE_URL, '/cpaas/createUser'),
    getLegalEntityList: apiPath(BASE_URL, '/ngboss/app/tata:legal_entity'),
    servicesList: apiPath(BASE_URL, '/cpaas/user/servicesList'),
    moduleslist: apiPath(BASE_URL, '/cpaas/user/moduleslist'),
}

// billing tickets
export const BILLING_TICKETING_URL = {
    getDisputeById: apiPath(BASE_URL, '/dispute/app/dispute/case'),
    addDispute: apiPath(BASE_URL, '/dispute/app/dispute/create'),
    getDisputeList: apiPath(BASE_URL, '/dispute/app/disputes'),
}

// billing tickets
export const SERVICE_ASSURENCE = {
    gettickets: apiPath(BASE_URL, '/snow/app/tickets'),
    getTicketDetails: apiPath(BASE_URL, '/snow/app/ticketDetails'),
    createTicket: apiPath(BASE_URL, '/snow/app/ticket/create'),
    createAttachmnet: apiPath(BASE_URL, '/snow/app/ticket/createAttachment'),
    getAttachments: apiPath(BASE_URL, '/snow/app/ticket/getAttachments'),
    downlaodAttachmnet: apiPath(BASE_URL, '/snow/app/ticket/downloadAttachment'),
}
// GETATTACHMENTS: (ticketId: any) => `/${ticketId}`,
// DOWNLOAD_ATTACHMENT: (ticketId: any, attachmentId: any) => `${ticketId}/${attachmentId}`