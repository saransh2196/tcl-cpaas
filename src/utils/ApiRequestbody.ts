export const CreateTicketBodyServiceAssurence = (body: any) => {
    let notes = [];
    if (body.notes && body.notes.length > 0) {
        notes = body.notes.map((note: any) => ({ author: note.author, text: note.text }))
    }
    return {
        "category": body.category,
        "contact": {
            email: body.emailId,
            name: body.contactPerson,
            primaryPhone: body.customerNumber,
        },
        "correlationId": "body.correlationId",
        "description": body.description,
        "impact": body.impact,
        "issueOccurenceDate": new Date().toISOString(),
        "notes": notes,
        "serviceIdentifier": body.serviceIdentifier,
        "assetid": body.assetid,
        "issueType": body.issueType
    }
}


export const UpdateUserBody = (body: any) => {
    return {
        ...body.emailId && { "emailId": body.emailId },
        ...body.username && { "username": body.username },
        ...body.rbacprofile && { "rbacprofile": body.rbacprofile },
        ...body.role && { "role": body.role },
        ...body.accountName && { "accountName": body.accountName },
        ...body.lastname && { "lastname": body.lastname },
        ...body.phoneNumber && { "phoneNumber": body.phoneNumber },
        ...body.zoneinfo && { "zoneinfo": body.zoneinfo },
        ...body.preferredCommunicationMode && { "preferredCommunicationMode": body.preferredCommunicationMode },
        ...body.status && { "status": body.status },
    }
}


export const RaiseTicektBillingInvoiceBody = (body: any) => {
    return {
        ...body.customerNumber && { "customerNumber": body.customerNumber },
        ...body.emailId && { "emailId": body.emailId },
        ...body.disputeTo && { "disputeTo": body.disputeTo },
        ...body.disputeOptimusAmount && { "disputeOptimusAmount": body.disputeOptimusAmount },
        ...body.contactPerson && { "contactPerson": body.contactPerson },
        ...body.listofValues && { "listofValues": body.listofValues },
        ...body.notesIssueDescription && { "notesIssueDescription": body.notesIssueDescription },
        ...body.issueType && { "issueType": body.issueType },
    }
}

export const AttachFilesBody = (body: any) => {
    const formData = new FormData();
    formData.append("ticketId", body.ticketId);
    formData.append("file", body.file);
    return formData;
}


export const foirGotPasswordBody = (body: any) => {
    return {
        "email": body.email
    }
}


export const LoginBody = (body: any) => {
    return {
        username: body.username,
        password: body.password
    }
}



export const ChangePasswordBody = (body: any) => {
    return {
        "oldPassword": body.oldPassword,
        "newPassword": body.newPassword,
        "username": body.username
    }
}


export const AddUserBody = (body: any) => {
    return {
        "cloneUserEmail": body.cloneUserEmail,
        "email": body.email,
        "phoneNumber": body.phoneNumber,
        "rbacprofile": {
            "name": body.rbacprofile.name,
            "accessPolicy": body.rbacprofile.accessPolicy
        },
        "role": body.role,
    }
}
