import { MockedRequest, RestContext } from 'msw'
import { errorResponse, successResponse } from '../helpers/api-response'
import * as disputeData from '../data/billingTickets-data';


export const getDisputeById = (req: MockedRequest, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: disputeData.getDisputeById, message: '', })
};

export const addDispute = (req: MockedRequest, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: disputeData.addDispute, message: 'SUCCESS', })
};

export const getDisputeList = (req: MockedRequest, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: disputeData.getCaseDetails, message: 'SUCCESS', })
};