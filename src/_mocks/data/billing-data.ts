import { BillingDataType } from '../types/billing-type'

export const getBillingListData: BillingDataType = {
    data: {
        metadata: {
            "allInvoice": 1,
            "overdue": 0,
            "unpaid": 0,
            "paid": 0
        },
        pageable: {
            "offset": "0",
            "pageNumber": "0",
            "pageSize": "20",
            "paged": "true"
        },
        invoice: [
            {
                "invoiceNumber": "14",
                "customerLe": "LINKEDIN IRELAND UNLIMITED COMP",
                "tataEntity": "TATA COMMUNICATIONS (IRELAND) DESIGNATED ACTIVITY COMPANY",
                "poNumber": "NG27439",
                "paymentStatus": "PENDING",
                "invoiceAmount": "0.0",
                "invoiceDate": "2022-11-24",
                "dueDate": "2022-12-01",
                "paymentDateTime": "",
                "timeZone": "IST",
                "currency": "USD"
            },
            {
                "invoiceNumber": "15",
                "customerLe": "INDIA JIO",
                "tataEntity": "TCL",
                "poNumber": "NG27439",
                "paymentStatus": "UNPAID",
                "invoiceAmount": "0.0",
                "invoiceDate": "2022-11-24",
                "dueDate": "2022-12-01",
                "paymentDateTime": "",
                "timeZone": "IST",
                "currency": "USD"
            },
            {
                "invoiceNumber": "16",
                "customerLe": "INDIA AIRTEL",
                "tataEntity": "TCS",
                "poNumber": "NG27439",
                "paymentStatus": "UNPAID",
                "invoiceAmount": "0.0",
                "invoiceDate": "2022-11-24",
                "dueDate": "2022-12-01",
                "paymentDateTime": "",
                "timeZone": "IST",
                "currency": "USD"
            },
            {
                "invoiceNumber": "16",
                "customerLe": "INDIA AIRTEL",
                "tataEntity": "TCS",
                "poNumber": "NG27439",
                "paymentStatus": "PAID",
                "invoiceAmount": "2.0",
                "invoiceDate": "2022-11-24",
                "dueDate": "2022-12-01",
                "paymentDateTime": "",
                "timeZone": "IST",
                "currency": "Rupees"
            }
        ]
    },
    message: "SUCCESS",
    status: 200

};