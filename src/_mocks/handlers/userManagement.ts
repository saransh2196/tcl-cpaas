import { MockedRequest, RestContext } from 'msw'
import db from '../db'
import { errorResponse, successResponse } from '../helpers/api-response'
import * as userManagementData from '../data/usermanagement-data';


export const getLegalEntityList = (req: MockedRequest, res: any, ctx: RestContext) => {
    return successResponse({
        res, ctx, data: userManagementData.getLegalEntityList, message: 'SUCCESS!!',
    })
};

export const getUsersList = (req: MockedRequest, res: any, ctx: RestContext) => {
    return successResponse({
        res, ctx, data: userManagementData.getUsersList(db.users.getAll()), message: 'User created successsfully!!',
    })
};

export const addUser = (req: any, res: any, ctx: RestContext) => {
    const d = db.users.create({
        ...req.body,
        emailId: req.body.email,
        id: `${new Date().valueOf()}`,
        status: 'invited'
    });
    return successResponse({ res, ctx, data: "SUCCESS", message: 'Add user successfully.', })
};

export const updateUser = (req: MockedRequest<{ username: string }>, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: "SUCCESS", message: 'User update successfully.', })
};