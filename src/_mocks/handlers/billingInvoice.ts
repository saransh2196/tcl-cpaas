import { MockedRequest, RestContext } from 'msw'
import db from '../db'
import pdfFile from './../static/billing-invoice.pdf'

export const getBillingList = (req: MockedRequest, res: any, ctx: RestContext) => {
    const q = req.url.searchParams.get('q')
    const invoiceData = db.billingInvoice.getAll()
    const data = {
        metadata: {
            "allInvoice": invoiceData.length,
            "overdue": invoiceData.filter(({ paymentStatus }) => paymentStatus == 'OVERDUE').length,
            "unpaid": invoiceData.filter(({ paymentStatus }) => paymentStatus == 'UNPAID').length,
            "paid": invoiceData.filter(({ paymentStatus }) => paymentStatus == 'PAID').length,
        },
        pageable: {
            "offset": "0",
            "pageNumber": "0",
            "pageSize": "20",
            "paged": "true"
        },
        invoice: invoiceData,
    }

    return res(
        // Respond with a 200 status code
        ctx.status(200),
        ctx.json({ data })
    );
};

export const viewInvoice = async (req: MockedRequest, res: any, ctx: RestContext) => {

    // Convert "base64" image to "ArrayBuffer".
    const imageBuffer = await fetch(pdfFile).then((res) =>
        res.arrayBuffer(),
    )

    return res(
        ctx.set('Content-Length', imageBuffer.byteLength.toString()),
        ctx.set('Content-Type', 'application/pdf'),
        // ctx.set('Content-Type', 'application/octet-stream'),
        // Respond with the "ArrayBuffer".
        ctx.body(imageBuffer),
    )

}

export const downloadInvoice = async (req: MockedRequest, res: any, ctx: RestContext) => {
    // Convert "base64" image to "ArrayBuffer".
    const imageBuffer = await fetch(pdfFile).then((res) =>
        res.arrayBuffer(),
    )
    return res(
        ctx.set('Content-Length', imageBuffer.byteLength.toString()),
        ctx.set('Content-Type', 'application/pdf'),
        ctx.set('Content-Type', 'application/octet-stream'),
        // Respond with the "ArrayBuffer".
        ctx.body(imageBuffer),
    )
}