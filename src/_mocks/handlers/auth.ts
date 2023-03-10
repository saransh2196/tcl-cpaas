import { MockedRequest, RestContext } from 'msw'
import db from '../db'
import { errorResponse, successResponse } from '../helpers/api-response'
import { IUser } from '../types/auth-type'
import { base64Decode } from '../../utils/Base64EncodeDecode'
import * as authData from '../data/auth';


export const login = (req: MockedRequest<{ username: string, password: string }>, res: any, ctx: RestContext) => {
    const { username, password } = req.body;
    const user: IUser | null = db.users.findFirst({ where: { emailId: { equals: username } } })
    if (!user || user.password !== base64Decode(password)) {
        return errorResponse({
            res,
            ctx,
            statusCode: 401,
            message: 'UNAUTHORIZED USER',
        })
    }

    const data = {
        access_token: 'moc_accessToken',
        refresh_token: 'moc_refreshToken',
        refresh_expires_in: 1800,
        token_type: 'Bearer',
        expires_in: 300
    };

    return successResponse({ res, ctx, data, message: 'Token Generated Successsfully', })
};

export const getUserInfo = (req: MockedRequest<{ username: string }>, res: any, ctx: RestContext) => {
    const username = req.url.searchParams.get('username')
    const user: IUser | null = db.users.findFirst({ where: { emailId: { equals: username! } } })

    if (!user) {
        return errorResponse({
            res,
            ctx,
            statusCode: 400,
            message: 'UNAUTHORIZED USER!!!',
        })
    }
    // user.rbacprofile = {
    //     "name": "UserProfile1",
    //     "accessPolicy": [
    //         "49:XYZ LIMITED::1:SMS::1:Billing Ticketing",
    //         "49:XYZ LIMITED::1:SMS::2:Billing Invoice"
    //     ]
    // }

    return successResponse({ res, ctx, data: user, message: 'User Details Fetched Successsfully', })
};

export const logout = (req: MockedRequest<{ refreshToken: string, username: string }>, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: "SUCCESS", message: 'Logout Successsfully', })
};

export const setPassword = (req: MockedRequest<{ username: string, newPassword: string }>, res: any, ctx: RestContext) => {
    const { username, newPassword } = req.body
    const user: IUser | null = db.users.findFirst({ where: { emailId: { equals: username } } })

    if (!user) {
        return errorResponse({
            res,
            ctx,
            statusCode: 401,
            message: 'UNAUTHORIZED USER',
        })
    }

    const updatePs = db.users.update({
        where: { emailId: { equals: username } },
        data: {
            password: base64Decode(newPassword)
        },
    })

    return successResponse({ res, ctx, data: "SUCCESS", message: 'Password set successfully.', })
};

export const changePassword = (req: MockedRequest<{ username: string, newPassword: string, oldPassword: string }>, res: any, ctx: RestContext) => {
    const { username, oldPassword, newPassword } = req.body
    const user: IUser | null = db.users.findFirst({ where: { emailId: { equals: username } } })

    if (!user || user.password !== base64Decode(oldPassword)) {
        return errorResponse({
            res,
            ctx,
            statusCode: 401,
            message: 'UNAUTHORIZED USER',
        })
    }

    const updatePs = db.users.update({
        where: { emailId: { equals: username } },
        data: {
            password: base64Decode(newPassword)
        },
    })

    return successResponse({ res, ctx, data: "SUCCESS", message: 'Password change successfully.', })
};

export const forgotPassword = (req: MockedRequest<{ username: string }>, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: "SUCCESS", message: 'Forgot Password Link Sent successfully.', })
};

export const refreshToken = (req: MockedRequest<{ refreshToken: string, username: string }>, res: any, ctx: RestContext) => {
    const data = {
        access_token: 'refresh_moc_accessToken',
        refresh_token: 'refresh_moc_refreshToken',
        refresh_expires_in: 1800,
        token_type: 'Bearer',
        expires_in: 900
    };
    return successResponse({ res, ctx, data, message: 'Refresh Token Generated Successsfully', })
};

export const updateUserInfo = (req: MockedRequest<{ emailId: string, firstname: string, lastName: string, phoneNumber: string, zoneinfo: string, preferredCommunicationMode: string }>, res: any, ctx: RestContext) => {
    const { emailId } = req.body
    const user: IUser | null = db.users.findFirst({ where: { emailId: { equals: emailId } } })

    if (!user) {
        return errorResponse({
            res,
            ctx,
            statusCode: 400,
            message: 'UNAUTHORIZED USER',
        })
    }

    db.users.update({
        where: { emailId: { equals: emailId } },
        data: req.body,
    })

    return successResponse({ res, ctx, data: "SUCCESS", message: 'User update successfully.', })
};

export const getBillingDetails = (req: MockedRequest, res: any, ctx: RestContext) => {
    return successResponse({ res, ctx, data: authData.billingData, message: 'SUCCESS', })
};



