import { MockedRequest, RestContext } from 'msw'
import { errorResponse, successResponse } from '../helpers/api-response'
import * as serviceAssurance from '../data/service-assurence';
import db from '../db';
import pdfFile from './../static/billing-invoice.pdf'

export const getTickets = (req: MockedRequest, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: db.tickets.getAll(), message: '', })
};



export const getAttachennts = (req: MockedRequest, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: serviceAssurance.getcseAttachments, message: '', })
};

export const createAttachment = (req: MockedRequest, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: 'Success', message: '', })
};


export const downlaodAttachment = async (req: MockedRequest, res: any, ctx: RestContext) => {
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
export const createTicket = (req: any, res: any, ctx: RestContext) => {
    const created = db.tickets.create({
        ...req.body,
        ticketId: `${new Date().valueOf()}`,
        ticketStatus: 'WIP',
        creationDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
    });
    return successResponse({
        res, ctx, data: {
            ticketNumber: created.ticketId
        }, message: 'Created ticket successfully',
    })
};

export const getTicketDetails = (req: any, res: any, ctx: RestContext) => {
    const ticket = db.tickets.findFirst({ where: { ticketId: { equals: req.body.ticketId } } });
    return successResponse({
        res, ctx, data: ticket, message: 'Created ticket successfully',
    })
};
