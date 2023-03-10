import Activeusers from "../assets/images/svg/Activeusers"
// import Inactiveusers from "../assets/images/svg/Inactiveusers"
// import Invitedusers from "../assets/images/svg/Invitedusers"
import Overdue from "../components/common/icons/overdue"
import PaidInvoice from "../components/common/icons/paidInvoice"
import UnpaidInvoice from "../components/common/icons/unpaidInvoice"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import active from "../components/common/icons/active"
import Inactiveusers from "../components/common/icons/Inactiveusers"
import Invitedusers from "../components/common/icons/Invitedusers";
import Historyicon from "../components/common/icons/Historyicon";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import HistoryIcon from '@mui/icons-material/History';


export const apiRoutes = {
    BASE_URL: 'http://115.112.43.74:8585',
    // BASE_URL: 'http://localhost:8585',
    // BASE_URL: 'http://localhost:8585',

    // User
    LOGIN: '/cpaas/token',
    REFRESH_TOKEN: '/cpaas/getAccessTokenFromRefresh',
    MOCKLOGIN: '/auth/login',
    SET_PASSWORD: '/api/v1/auth/password',
    FORGOT_PASSWORD: '/cpaas/forgotPassword',
    RESET_PASSWORD: '/cpaas/resetPassword',
    GET_USER_INFO: '/cpaas/userinfo',
    LOGOUT: '/cpaas/logout',
    CHANGE_PASSWORD: '/cpaas/resetPassword',


    // Billing
    GET_INVOICES: '/ngboss/app/invoice/simple',
    VIEW_INVOICES: '/ngboss/app/invoice/view',
    DOWNLOAD_INVOICES: '/ngboss/app/invoice/download',
    DOWNLOAD_INVOICES_CDR: '/ngboss/app/invoice/view',
    RAISE_DISPUTE: '/dispute/app/dispute/create',

    //account
    UPDATE_USER_INFO: '/cpaas/updateUserDetails',
    GET_ACCOUNT_BILLING_DETAILS: '/ngboss/app/account',


    // usermanagmnts
    GET_USERS_LIST: '/cpaas/getUsers',
    ADD_USER: '/cpaas/createUser',
    legalEntityList: '/ngboss/app/tata:legal_entity',
    servicesList: '/cpaas/user/servicesList',
    moduleslist: '/cpaas/user/moduleslist',



    // billing tickets

    GET_DISPUTES: '/dispute/app/disputes',
    GET_DISPUTE_DETAILS: '/dispute/app/dispute/case',


    // Service assurence
    GET_SERVICE_ASSU: '/snow/app/tickets',
    GET_SERVICE_DETAILS: '/snow/app/ticketDetails',
    CREATE_TICKET: '/snow/app/ticket/create',
    CREATE_ATACHMENT: '/snow/app/ticket/createAttachment',
    GETATTACHMENTS: (ticketId: any) => `/snow/app/ticket/getAttachments/${ticketId}`,
    DOWNLOAD_ATTACHMENT: (ticketId: any, attachmentId: any) => `/snow/app/ticket/downloadAttachment/${ticketId}/${attachmentId}`

}

export const CONFIG_VALUES = {
    maxFileSize: 5242880
}

export const apiHelpers = {
    HEADER_AUTHORIZATION: 'Authorization',
    HEADER_CONTENT_TYPE: 'Content-Type',
    TOKEN_TYPE: 'Bearer',
    CONTENT_TYPE_APP_JSON: 'application/json',
    CONTENT_TYPE_APP_PDF: 'application/pdf',
    MULTIPART: 'multipart/form-data'
}

export const appThemes = {
    LIGHT_THEME: 'light',
    DARK_THEME: 'dark',
}

export const localStorageVar = {
    THEME_VAR: 'theme',
    TOKEN_VAR: 'token',
    REFRESH_TOKEN: 'refreshToken',
    USER_VAR: 'user',
    I18_LANG_VAR: 'i18nextLng',
    LANG_VAR: 'lng',
}

export const thunkPaths = {
    LOGIN_THUNK: 'auth/login',
    LOGOUT_THUNK: 'auth/logout',
    UPDATEPASSWORD_THUNK: 'auth/updatePassword',
}

export const slices = {
    AUTH_SLICE: 'auth',
    BILLING_SLICE: 'billing',
    SERVICE_ASSURENCE: 'serviceAssurence',
    COMMON_SLICE: 'common',
    ACCOUNT_SLICE: 'accountDetails',
    USER_MANAGMENT_SLICE: 'usermanagmentSlice'
}

export const billingKeys = {
    INVOICE_NUMBER: 'invoiceNumber',
    CUSTOMER_LE: 'customerLe',
    TATA_ENTITY: 'tataEntity',
    PO_NUMBER: 'poNumber',
    PAYMENT_STATUS: 'paymentStatus',
    INVOICE_AMOUNT: 'invoiceAmount',
    CURRENCY: 'currency',
    INVOICE_DATE: 'invoiceDate',
    DUE_DATE: 'dueDate',
    PAYMENT_DATE_TIME: 'paymentDateTime',
    TIME_ZONE: 'timeZone',
}

export const typeVar = {
    IMAGE_WEBP: 'image/webp',
    IMAGE_PNG: 'image/png',
    IMAGE_SVG: 'image/svg+xml',
    IMAGE_JPG: 'image/jpg',
    TEXT: 'text/plain',
    HTML: 'text/html',
    PDF: 'application/pdf',
    JSON: 'application/json',
    MP4: 'audio/mp4',
    OGG: 'audion/ogg',
    OTF: 'font/opentype',
    WEBM: 'video/webm',
}

export const appRoutes = {
    DEFAULT_PARMS: '?page=1&take=10',
    ROOT: '/',
    LOGIN: '/login',
    SET_PASSWORD: '/setpassword',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/password/reset/:token',
    NOT_FOUND: '*',
    BILLING: '/invoices',
    CHANGE_PASSWORD: '/change-password',
    USER_MANAGEMENT: '/user-management',
    BILLING_TICKET: '/billing-ticket',
    SERVICE_ASSURANCE: '/service-assurence',
    DASHBOARD: '/dashboard',
    ACCOUNT_DETAILS: '/accountdetails',
    WELCOME: '/welcome',
}

export const breadCrums = {
    BILLING: {
        path: [
            { transName: 'dashboard', type: 'link', linkURL: appRoutes.BILLING },
            { transName: 'billingInvoiceshead', type: 'text', linkURL: '' },
        ],
        PageName: 'billingInvoiceshead',
    },
    BILLING_TICKETS: {
        path: [
            { transName: 'dashboard', type: 'link', linkURL: appRoutes.BILLING_TICKET },
            { transName: 'billingTicketHead', type: 'text', linkURL: '' },
        ],
        PageName: 'billingTicketHead',
    },
    SERVICE_ASSURENCE: {
        path: [
            { transName: 'dashboard', type: 'link', linkURL: appRoutes.BILLING_TICKET },
            { transName: 'serviceAssurenceHead', type: 'text', linkURL: '' },
        ],
        PageName: 'serviceAssurenceHead',
    },
    CHANGE_PASSWORD: {
        path: [
            { transName: 'dashboard', type: 'link', linkURL: appRoutes.CHANGE_PASSWORD },
            { transName: 'changePasswordhead', type: 'text', linkURL: '' },
        ],
        PageName: 'changePasswordhead',
    },
    USER_MANAGEMENT: {
        path: [
            { transName: 'dashboard', type: 'link', linkURL: appRoutes.USER_MANAGEMENT },
            { transName: 'userManagementhead', type: 'text', linkURL: '' },
        ],
        PageName: 'userManagementhead',
    },
    ACCOUNT_DETAILS: {
        path: [
            { transName: 'dashboard', type: 'link', linkURL: appRoutes.ACCOUNT_DETAILS },
            { transName: 'accountDetailshead', type: 'text', linkURL: '' },
        ],
        PageName: 'accountDetailshead',
    },
}

export const dataTables = {
    BILLING: (values: [], masterData = [], viewPdfHandler: any, RaiseTicket: any, downlaodHandler: any) => ({
        data: values.map((v: any) => {
            return {
                ...v,
                ...v[apiVrbls.BILLING.PAY_STATUS] == cardsValues.BILLING_INVOICE.OVERDUE && { iconEle: Overdue },
                ...v[apiVrbls.BILLING.PAY_STATUS] == cardsValues.BILLING_INVOICE.PENDING && { iconEle: UnpaidInvoice },
                ...v[apiVrbls.BILLING.PAY_STATUS] == cardsValues.BILLING_INVOICE.COMPLETED && { iconEle: PaidInvoice },
                icon: v[apiVrbls.BILLING.PAY_STATUS],
                actionItems: [
                    { actionFragment: viewPdfHandler },
                    { actionFragment: RaiseTicket },
                    { actionFragment: downlaodHandler },
                ],

            }
        }),
        allMasterData: masterData.map((v: any) => {
            return {
                ...v, icon: v[apiVrbls.BILLING.PAY_STATUS]
            }
        }),
        columns: [
            {
                eleName: apiVrbls.BILLING.INVOICE_ID,
                headTrans: 'id',
                sort: true,
                search: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING.INVOICE_ID,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING.INVOICE_ID]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING.CUSTOMER_LE,
                headTrans: 'customerLe',
                sort: true,
                search: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING.CUSTOMER_LE,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING.CUSTOMER_LE]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING.TATA_ENTITY,
                headTrans: 'entity',
                sort: true,
                search: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING.TATA_ENTITY,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING.TATA_ENTITY]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING.PO_NUMBER,
                headTrans: 'poNo',
                sort: true,
                search: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING.PO_NUMBER,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING.PO_NUMBER]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING.PAY_STATUS,
                headTrans: 'status',
                sort: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING.PAY_STATUS,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING.PAY_STATUS]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING.INVOICE_AMT,
                headTrans: 'invoiceAmount',
                sort: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING.CURENCY,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING.CURENCY]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING.INVOICE_DATE,
                headTrans: 'invoiceIssuedDate',
                sort: false,
                filter: false,
                isActive: true
            },
            { eleName: 'Due_date', headTrans: 'dueDate', sort: false, filter: false, isActive: true },
        ],
        tableName: 'billing',
    }),

    BILLING_TICKET: (values: [], masterData = [], RaiseTicket: any) => ({
        data: values.map((v: any) => {
            return {
                ...v,
                ...v[apiVrbls.BILLING_TICKET.STATUS] == cardsValues.BILLING_TIKCET.INPROGRESS && { iconEle: Historyicon },
                ...v[apiVrbls.BILLING_TICKET.STATUS] == cardsValues.BILLING_TIKCET.RESOLVED && { iconEle: ThumbUpOffAltIcon },
                icon: v[apiVrbls.BILLING_TICKET.STATUS],
                actionItems: [
                    { actionFragment: RaiseTicket },
                ],

            }
        }),
        allMasterData: masterData.map((v: any) => {
            return {
                ...v, icon: v[apiVrbls.BILLING.PAY_STATUS]
            }
        }),

        columns: [
            {
                eleName: apiVrbls.BILLING_TICKET.TICKET_NUMBER,
                headTrans: 'ticketNumber',
                sort: true,
                search: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING_TICKET.TICKET_NUMBER,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING_TICKET.TICKET_NUMBER]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },

            {
                eleName: apiVrbls.BILLING_TICKET.INVOICE_NUMBER,
                headTrans: 'invoiceNumber',
                sort: true,
                search: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING_TICKET.INVOICE_NUMBER,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING_TICKET.INVOICE_NUMBER]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING_TICKET.STATUS,
                headTrans: 'status',
                sort: true,
                search: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING_TICKET.STATUS,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING_TICKET.STATUS]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING_TICKET.ISSUETYPE,
                headTrans: 'issueType',
                sort: true,
                filter: true,
                filterData: {
                    element: apiVrbls.BILLING_TICKET.ISSUETYPE,
                    values: masterData.map((e: any) => e[apiVrbls.BILLING_TICKET.ISSUETYPE]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING_TICKET.CREATED_DATE,
                headTrans: 'createdDate',
                sort: true,
                filter: false,
                isActive: true
            },
            {
                eleName: apiVrbls.BILLING_TICKET.LAST_UPDATED,
                headTrans: 'updatedDate',
                sort: false,
                filter: false,
                isActive: true
            },
        ],
        tableName: 'billingTicket',
    }),


    SERVICE_ASSURENCE: (values: [], masterData = [], viewTicket: any, downlaodtxt: any) => ({
        data: values.map((v: any) => {
            return {
                ...v,
                ...v[apiVrbls.SERVICE_ASSURANCE.STATUS] == cardsValues.SERVICE_ASSURENCE.INPROGRESS && { iconEle: HistoryIcon },
                ...v[apiVrbls.SERVICE_ASSURANCE.STATUS] == cardsValues.SERVICE_ASSURENCE.RESOLVED && { iconEle: ThumbUpOffAltIcon },
                icon: v[apiVrbls.SERVICE_ASSURANCE.STATUS],
                actionItems: [
                    { actionFragment: viewTicket },
                    { actionFragment: downlaodtxt },
                ],

            }
        }),
        allMasterData: masterData.map((v: any) => {
            return {
                ...v, icon: v[apiVrbls.BILLING.PAY_STATUS]
            }
        }),

        columns: [
            { eleName: apiVrbls.SERVICE_ASSURANCE.TICKET_NUMBER, headTrans: 'ticketNumber', sort: true, search: true, filter: false, isActive: true },
            {
                eleName: apiVrbls.SERVICE_ASSURANCE.SERVICE,
                headTrans: 'service',
                sort: true,
                search: true,
                filter: false,
                isActive: true
            },
            {
                eleName: apiVrbls.SERVICE_ASSURANCE.ASSETID,
                headTrans: 'assetid',
                sort: true,
                search: true,
                filter: false,
                isActive: true
            },
            {
                eleName: apiVrbls.SERVICE_ASSURANCE.STATUS,
                headTrans: 'status',
                sort: true,
                filter: true,
                filterData: {
                    element: apiVrbls.SERVICE_ASSURANCE.STATUS,
                    values: masterData.map((e: any) => e[apiVrbls.SERVICE_ASSURANCE.STATUS]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.SERVICE_ASSURANCE.IMPACT,
                headTrans: 'impact',
                sort: true,
                search: true,
                filter: false,
                isActive: true
            },
            {
                eleName: apiVrbls.SERVICE_ASSURANCE.ISSUETYPE,
                headTrans: 'issueType',
                sort: true,
                filter: true,
                filterData: {
                    element: apiVrbls.SERVICE_ASSURANCE.ISSUETYPE,
                    values: masterData.map((e: any) => e[apiVrbls.SERVICE_ASSURANCE.ISSUETYPE]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.SERVICE_ASSURANCE.CREATED_DATE,
                headTrans: 'createdDate',
                sort: true,
                filter: false,
                filterData: {
                    element: apiVrbls.SERVICE_ASSURANCE.CREATED_DATE,
                    values: masterData.map((e: any) => e[apiVrbls.SERVICE_ASSURANCE.CREATED_DATE]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.SERVICE_ASSURANCE.LAST_UPDATED,
                headTrans: 'updatedDate',
                sort: false,
                filter: false,
                isActive: true
            },
        ],
        tableName: 'serviceAssurance',
    }),


    USER_MANAGMENT: (values: [], masterData = [], inactive: any, edit: any, editcard: any, inactivecard: any) => ({
        data: values.map((v: any) => {
            return {
                ...v,
                ...v[apiVrbls.USER_MANAGMENT.STATUS] == cardsValues.USER_MANAGEMENT.ACTIVE && { iconEle: active },
                ...v[apiVrbls.USER_MANAGMENT.STATUS] == cardsValues.USER_MANAGEMENT.INACTIVR && { iconEle: Inactiveusers },
                ...v[apiVrbls.USER_MANAGMENT.STATUS] == cardsValues.USER_MANAGEMENT.INVITED && { iconEle: Invitedusers },
                icon: v[apiVrbls.USER_MANAGMENT.STATUS],
                actionItems: [
                    { actionFragment: inactive },
                    { actionFragment: edit },
                ],
                handlers: {
                    inactiveHandler: inactivecard,
                    editcard: editcard,
                }
            }
        }),
        allMasterData: masterData.map((v: any) => {
            return {
                ...v, icon: v[apiVrbls.BILLING.PAY_STATUS]
            }
        }),
        columns: [
            { eleName: apiVrbls.USER_MANAGMENT.NAME, headTrans: 'name', sort: true, search: true, filter: false, isActive: true },
            {
                eleName: apiVrbls.USER_MANAGMENT.EMAIL_ID,
                headTrans: 'email',
                sort: true,
                search: true,
                filter: false,
                filterData: {
                    element: apiVrbls.USER_MANAGMENT.EMAIL_ID,
                    values: masterData.map((e: any) => e[apiVrbls.USER_MANAGMENT.EMAIL_ID]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.USER_MANAGMENT.ROLE,
                headTrans: 'role',
                sort: true,
                search: true,
                filter: false,
                isActive: true
            },
            {
                eleName: apiVrbls.USER_MANAGMENT.LEGAL_ENTITY,
                headTrans: 'legalEntity',
                sort: true,
                search: true,
                filter: false,
                filterData: {
                    element: apiVrbls.USER_MANAGMENT.LEGAL_ENTITY,
                    values: masterData.map((e: any) => e[apiVrbls.USER_MANAGMENT.LEGAL_ENTITY]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.USER_MANAGMENT.STATUS,
                headTrans: 'status',
                sort: true,
                filter: true,
                filterData: {
                    element: apiVrbls.USER_MANAGMENT.STATUS,
                    values: masterData.map((e: any) => e[apiVrbls.USER_MANAGMENT.STATUS]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
            {
                eleName: apiVrbls.USER_MANAGMENT.CREATED_DATE,
                headTrans: 'createdDate',
                sort: true,
                filter: false,
                filterData: {
                    element: apiVrbls.USER_MANAGMENT.CREATED_DATE,
                    values: masterData.map((e: any) => e[apiVrbls.USER_MANAGMENT.CREATED_DATE]).filter((it, i, ar) => ar.indexOf(it) === i)
                },
                isActive: true
            },
        ],
        tableName: 'usermanagment',
    }),
}

export const apiDefaultrespons = {
    LOGIN_ERRRO: {
        "meta_data": {
            "api_name": "token"
        },
        "data": {
            "data": null,
            "message": "Internal Error",
            "status": 404
        }
    }
}


export const staticErrors = {
    serverInactive: "Opps! Something went wrong"
}


export const apiVrbls = {
    USER: {
        ACCESS_TOKEN: "access_token",
        REFRESH_TOKEN: "refresh_token",
        IS_LOGGED_IN_FIRST: "loginFirstTime",
        EMAIL_ID: "emailId",
        PHONE: "phoneNumber",
        ACCOUNT_NAME: "accountName",
        FIRST_NAME: "firstname",
        ROLE: "role",
        LAST_NAME: "lastName",
        MODULE: {
            EMAIL_ID: "emailId",
            FIRST_NAME: "firstname",
            LAST_NAME: "lastname",
            PHONE: "phoneNumber",
            COMMUNICATON: "preferredCommunicationMode",
            TIMEZONE: "zoneinfo",
            RBAACKPROFILE: "rbacprofile",
            RBAACKPROFILE_CHILD: {
                ACESS_POLICY: "accessPolicy"
            }

        }
    },

    ACCOUNT: {
        LES: "legalEntities",
        ACCOUNT_NAME: "accountName",
        LES_CHILD: {
            BILL_DETA: "billingDetails",
            LE_ID: "legalEntityId",
            LE_NAME: "legalEntityName",
            SND_INV_CON: "sendInvoiceToContact",
            BILL_DETA_CILD: {
                ACC_STAT: "accountStatus",
                APP_CABL_CUR: "applicableCurrency",
                BILL_CYC: "billingCycle",
                BILL_TYPE: "billingtype",
                COMP_PAN: "companyPAN",
                CON_TERM: "contractTerm",
                PAY_PER: "paymentPeriod",
                RATCHNG_NOT_PER: "rateChangeNotificationPeriod",
                RATECOVERCHNGTIME: "rateCoverageChangeTimeZone",
                VATGST: "vatOrGSTNoOrTxId",
            },
            SND_INV_CON_CHILD: {
                ADDRESS: "address",
                CITY: "city",
                COUNTRY: "country",
                CUS_AUT_RAT_NOT_REC: "customerAuthorizedRateNotificationRecipient",
                EMAIL: "emailId",
                NAME: "name",
                PIN: "pin",
            }
        }
    },

    BILLING: {
        CURENCY: 'currency',
        INVOICE_AMT: 'invoiceAmount',
        INVOICE_ID: 'invoiceNumber',
        CUSTOMER_LE: 'customerLe',
        TATA_ENTITY: 'tataEntity',
        PO_NUMBER: 'poNumber',
        PAY_STATUS: 'paymentStatus',
        INVOICE_DATE: 'invoiceDate',
    },
    BILLING_TICKET: {
        MODULE: {
            CASE_DETAILS: 'caseDetails',
            DISPUTE_ID: "disputeCaseId",
            INVOICE_NUMBER: "invoiceNo",
            ISSUETYPE: "issueType",
            ISSUE_DETAILS: "issueDetails",
            DISPU_STATUS: "disputeStatus",
            CREATED_DATE: "creationDate",
            LAST_UPDATED: "lastUpdatedOn",
            NOTES: {
                AUTHOR: "author",
                DATE: "date",
                TEXT: "text",
            }
        },
        TICKET_NUMBER: "disputeCaseId",
        INVOICE_NUMBER: "invoiceNo",
        STATUS: "disputeStatus",
        ISSUETYPE: "issueType",
        CREATED_DATE: "creationDate",
        LAST_UPDATED: "lastUpdatedOn",
        ATTACHMENTS: {
            ATTACHMENT_ID: "attachmentId"
        }
    },
    SERVICE_ASSURANCE: {
        TICKET_NUMBER: "ticketId",
        ASSETID: "assetid",
        SERVICE: "serviceIdentifier",
        STATUS: "ticketStatus",
        IMPACT: "impact",
        ISSUETYPE: "issueType",
        CREATED_DATE: "creationDate",
        LAST_UPDATED: "ticketClosedTime",
        TIKCET_DETAILS: {
            TICKET_ID: "ticketId",
            CREATEDDATE: "creationDate",
            STATUS: "ticketStatus",
            SERVICE_NAME: "serviceIdentifier",
            ASSET_ID: "assetid",
            ISSUE_TYPE: "issueType",
            DESCRIPTION: "description",
            NOTES: {
                AUTHOR: "author",
                DATE: "date",
                TEXT: "text",
            }
        },
        ATTACHMENTS: {
            ATTACHMENT_ID: "attachmentId"
        }
    },
    USER_MANAGMENT: {
        NAME: 'name',
        EMAIL_ID: "emailId",
        FIREST_NAME: "firstname",
        ID: "id",
        LAST_NAME: "lastName",
        LEGAL_ENTITY: "legalEntity",
        LOGIN_FIRST_TIME: "loginFirstTime",
        PHONE_NUMBER: "phoneNumber",
        PREFERED_COMMUNICATION: "preferredCommunicationMode",
        ROLE: "role",
        STATUS: "status",
        TIMEZONE: 'timezone',
        CREATED_DATE: "createdDate"
    },
    CREATEDISPUTE: {
        TICKET_NUMBER: "ticketNumber",
    },
    CREATESERVICETICKET: {
        TICKET_NUMBER: "ticketNumber",
    },
}

export const DefaultInputs = {
    UserStatus: [
        { name: 'active', value: 'active' },
        { name: 'inactive', value: 'inactive' },
        { name: 'invited', value: 'invited' }
    ],
    allCommunicationModes: [
        {
            name: 'Phone',
            value: 'PHONE'
        },
        {
            name: 'Email',
            value: 'EMAIL'
        }
    ],
    allTimeZones: [
        {
            name: 'IST',
            value: 'IST'
        },
        {
            name: 'UTC +1:30',
            value: 'UTC'
        },
        {
            name: 'UTC +5:30',
            value: 'UTC-5'
        }
    ],
    requestInputs: [
        { name: 'Call Records/Cdr Details Required', value: 'Call Records/Cdr Details Required' },
        { name: 'Update Po Number On The Invoice', value: 'Update Po Number On The Invoice' },
        { name: 'Name Change on The Legal Entity', value: 'Name Change on The Legal Entity' },
        { name: 'Billing Address Change', value: 'Billing Address Change' },
        { name: 'Contact details Updation', value: 'Contact details Updation' },
        { name: 'The Exemption Required', value: 'The Exemption Required' },
        { name: 'CBF Request For Invoice Merge/De-merge', value: 'CBF Request For Invoice Merge/De-merge' },
    ],
    Complaint: [
        { name: 'Dispute Of Date Of Commission', value: 'Dispute Of Date Of Commission',inputs:[{fieldName:"Start",fieldId:"1"}] },
        { name: 'Invoice Received From Terminated Circuits', value: 'Invoice Received From Terminated Circuits' },
        { name: 'Incorrect Invoice for Downgraded Circuits', value: 'ncorrect Invoice for Downgraded Circuits' },
        { name: 'Incorrect Invoice For Upgraded Circuits', value: 'Incorrect Invoice For Upgraded Circuits' },
        { name: 'Early Termination Charges', value: 'Early Termination Charges' },
        { name: 'Commercial Mismatch in Cof & Invoice', value: 'Commercial Mismatch in Cof & Invoice' },
        { name: 'Dispute on Billed Usage', value: 'Dispute on Billed Usage' },
        { name: 'Credit Not Received Under Contratual Terms', value: 'Credit Not Received Under Contratual Terms' },
    ],
    TOTAL_LOSS_SERVICE_INPUTS: [
        { name: 'Bind Failure', value: 'Bind Failure' },
        { name: 'Delivery Failure', value: 'Delivery Failure' },
        { name: 'DATA Total Loss of Service', value: 'False Delivery' },
    ],
    PARTIAL_LOSS_IPUTS: [
        { name: 'Delivery Failure', value: 'Delivery Failure' },
        { name: 'False Delivery', value: 'False Delivery' },
        { name: 'DATA Partial Loss', value: 'DATA Partial Loss' },
        { name: 'Latency', value: 'Latency' },
        { name: 'SMS Partial Loss', value: 'SMS Partial Loss' },
        { name: 'Conversion Rate', value: 'Conversion Rate' },
        { name: 'Content Issue', value: 'Content Issue' },
        { name: 'SMS', value: 'SMS' },
        { name: 'Spamming', value: 'Spamming' },
        { name: 'Sender ID Replacement', value: 'Sender ID Replacement' },
        { name: 'API/PORTAL', value: 'API/PORTAL' },
        { name: 'Data', value: 'Data' },
        { name: 'Throttling', value: 'Throttling' },
        { name: 'MT SMS FAILURE Partial Loss', value: 'MT SMS FAILURE Partial Loss' },
        { name: 'Voice Partial Loss', value: 'Voice Partial Loss' },
        { name: 'DATA_PL_NGP', value: 'DATA_PL_NGP' },
        { name: 'SPAM Traffic', value: 'SPAM Traffic' },
    ],
    NOIMPACT_INPUTS: [
        { name: 'Information', value: 'Information' },
        { name: 'Delivery Failure', value: 'Delivery Failure' },
        { name: 'PORTAL', value: 'PORTAL' },
        { name: 'REPORTING', value: 'REPORTING' },
        { name: 'API /PORTAL', value: 'API /PORTAL' },
        { name: 'PROVISIONING', value: 'PROVISIONING' },
        { name: 'Sender ID Whitelisting', value: 'Sender ID Whitelisting' },
        { name: 'False Delivery', value: 'False Delivery' },
        { name: 'PORTAL_NI_NGP', value: 'PORTAL_NI_NGP' },
    ],
    IMPACTS: [
        { name: 'Total Loss of Service', value: 'Total Loss of Service' },
        { name: 'Partial Loss', value: 'Partial Loss' },
        { name: 'No Impact', value: 'No Impact' },
    ]
}


export const cardsValues = {
    BILLING_INVOICE: {
        OVERDUE: "overdue",
        PENDING: "pending",
        COMPLETED: "completed"
    },
    BILLING_TIKCET: {
        INPROGRESS: "WIP",
        RESOLVED: "completed"
    },
    SERVICE_ASSURENCE: {
        INPROGRESS: "WIP",
        RESOLVED: "completed"
    },
    USER_MANAGEMENT: {
        ACTIVE: 'active',
        INACTIVR: 'inactive',
        INVITED: 'invited'
    }
}



export const RBACK_MODULES = {
    [appRoutes.BILLING_TICKET]: 1,
    [appRoutes.BILLING]: 2,
    [appRoutes.SERVICE_ASSURANCE]: 3
}