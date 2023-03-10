import * as Yup from 'yup'
import { validateEmail } from './helpers'

export const LoginFormSchema = Yup.object().shape({
    user: Yup.string().test('emailTest', 'Please enter a valid email', validateEmail),
    password: Yup.string().required("Please enter password")
})



export const addUserSchema = Yup.object().shape({
    username: Yup.string().test('emailTest', 'Please enter a valid email', validateEmail),
    userValue: Yup.string(),
    // firstname: Yup.string().required("Please enter firstname"),
    // lastName: Yup.string().required("Please enter lastName"),
    phonenumber: Yup.string(),
    // timeZone: Yup.string().required("Please enter timeZone"),
    // preferredCommunicationMode: Yup.string().required("Please enter preferredCommunicationMode"),
    rbacprofile: Yup.array().optional(),
    role: Yup.string().required("Please select role"),
    // accountName: Yup.string().required("Please enter accountName"),
    profiles: Yup.array(Yup.object({
        entity: Yup.string(),
        service: Yup.string(),
        module: Yup.array(),
    })),
})


export const raiseTikcetSchema = Yup.object().shape({
    "listofValues": Yup.string().required("Please select listofValues"),
    "disputeOptimusAmount": Yup.string().required("Please select disputeOptimusAmount"),
    "disputeTo": Yup.string().required("Please select disputeTo"),
    "notesIssueDescription": Yup.string().required("Please select notesIssueDescription"),
    "contactPerson": Yup.string().required("Please select contactPerson"),
    "customerNumber": Yup.string().required("Please select customerNumber"),
    "emailId": Yup.string().test('emailTest', 'Please enter a valid email', validateEmail),
     "filesUpload": Yup.array().of(Yup.string().required("Please select issueType")),
})


export const raiseTikcetServiceSchema = Yup.object().shape({
    "contact": Yup.string(),
    "messageID": Yup.string(),
    "description": Yup.string().required("Please select description"),
    "issueType": Yup.string().required("Please select issueType"),
    "impact": Yup.string().required("Please select impact"),
    "assetid": Yup.string().required("Please select assetid"),
    "serviceIdentifier": Yup.string().required("Please select serviceIdentifier"),

})

export const userEditFormSchem = Yup.object().shape({
    "firstname": Yup.string().required("Required"),
    "lastName": Yup.string().required("Required"),
    "phoneNumber": Yup.string().required("Required"),
    "preferredCommunicationMode": Yup.string().required("Required"),
    "timezone": Yup.string().required("Required"),
    "emailId": Yup.string()
})



export const raiseTicket = Yup.object().shape({
    username: Yup.string().test('emailTest', 'Please enter a valid email', validateEmail),
    userValue: Yup.string(),
    // firstname: Yup.string().required("Please enter firstname"),
    // lastName: Yup.string().required("Please enter lastName"),
    phonenumber: Yup.string(),
    // timeZone: Yup.string().required("Please enter timeZone"),
    // preferredCommunicationMode: Yup.string().required("Please enter preferredCommunicationMode"),
    rbacprofile: Yup.array().optional(),
    role: Yup.string().required("Please select role"),
    // accountName: Yup.string().required("Please enter accountName"),
    profiles: Yup.array(Yup.object({
        entity: Yup.string(),
        service: Yup.string(),
        module: Yup.array(),
    })),
})

export const editUserSchema = Yup.object().shape({
    username: Yup.string().test('emailTest', 'Please enter a valid email', validateEmail),
    userValue: Yup.string(),
    // firstname: Yup.string().required("Please enter firstname"),
    // lastName: Yup.string().required("Please enter lastName"),
    phonenumber: Yup.string(),
    status: Yup.string(),
    // timeZone: Yup.string().required("Please enter timeZone"),
    // preferredCommunicationMode: Yup.string().required("Please enter preferredCommunicationMode"),
    rbacprofile: Yup.array().optional(),
    // role: Yup.string().required("Please select role"),
    // accountName: Yup.string().required("Please enter accountName"),
    profiles: Yup.array(Yup.object({
        entity: Yup.string(),
        service: Yup.string(),
        module: Yup.array(),
    })),
})


export const AccountDetailsSchema = Yup.object().shape({
    firstname: Yup.string().required("Please enter firstname"),
    lastName: Yup.string().required("Please enter lastname"),
    phoneNumber: Yup.string().required("Please enter phoneNumber"),
    communication: Yup.string().required("Please enter communication"),
    timezone: Yup.string().required("Please enter timezone"),
})


export const ForgotPasswordSchema = Yup.object().shape({
    user: Yup.string().test('emailTest', 'Please enter a valid email', validateEmail),
})

export const setPasswordSchema = Yup.object().shape({
    newPass: Yup.string().required("Please enter password")
        .matches(/[A-Z]/, "Password must contain atleast one uppercase")
        .matches(/[a-z]/, "Password must contain atleast one lowercase")
        .matches(/[@#&]/, "Password must contain special character @,#,&")
        .min(8, "password must be at least 8 characters"),
    cnfPassword: Yup.string().required("Confirm password is required")
})


export const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("old password is required"),
    newPass: Yup.string().required("Please enter password")
        .matches(/[A-Z]/, "Password must contain atleast one uppercase")
        .matches(/[a-z]/, "Password must contain atleast one lowercase")
        .matches(/[@#&]/, "Password must contain special character @,#,&")
        .min(8, "password must be at least 8 characters"),
    cnfPassword: Yup.string().required("Confirm password is required")
})