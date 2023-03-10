interface Invoice {
    invoiceNumber: string,
    customerLe: string,
    tataEntity: string,
    poNumber: string,
    paymentStatus: string,
    invoiceAmount: string,
    invoiceDate: string,
    dueDate: string,
    paymentDateTime: string,
    timeZone: string,
    currency: string
}

export interface BillingDataType {
    data: {
        metadata: {
            allInvoice: number,
            overdue: number,
            unpaid: number,
            paid: number
        },
        pageable: {
            offset: string,
            pageNumber: string,
            pageSize: string,
            paged: string
        },
        invoice: Invoice[]
    },
    message: string,
    status: number,
}