import { apiVrbls, staticErrors } from "./constants";

export const loginTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": { "api_name": "token" },
        "data": { "data": null, "message": "Incorrect username or password", "status": 200 }
    }
    try {
        if (resp.data && resp.message && resp.status) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}

export const refrshTokenTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": { "api_name": "token" },
        "data": { "data": null, "message": "Incorrect username or password", "status": 200 }
    }
    try {
        if (resp.data && resp.message && resp.status) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}

const returnBackData = (data: any) => {
    try {
        if (!data) {
            return {};
        }
        const checked: any = [];
        const g: any = [];
        const gValies: any = [];
        data.map((f: any) => {
            const a = f.split('::')
            const h = data.filter((c: any) => {
                return (c.includes(`${a[0]}::${a[1]}`));
            });
            if (!checked.includes(`${a[0]}::${a[1]}`)) {
                const d: any = { module: [] };
                const val: any = { module: [] }
                h.map((c: any) => {
                    const q = `${c}`.split('::');
                    d.entity = q[0].split(':')[0];
                    d.service = q[1].split(':')[0];
                    d.module.push(+q[2].split(':')[0]);
                    val.entity = { name: q[0].split(':')[1], value: q[0].split(':')[0] }
                    val.service = { name: q[1].split(':')[1], value: q[1].split(':')[0] }
                    val.module.push({ name: q[2].split(':')[1], value: +q[2].split(':')[0] });
                });
                g.push(d);
                gValies.push(val);
                checked.push(`${a[0]}::${a[1]}`);
            }
        });
        return { values: g, names: gValies }
    } catch {
        return { values: [], names: [] }
    }

}

export const userInfoTransformer = (data: any) => {
    const resp = JSON.parse(data);
    // path for rback without names resp.data.rbacprofile.accessPolicy (Comment just for reference)
    try {
        if (resp && resp.data && resp.status == 200) {
            return {
                ...resp.data,
                ...(resp.data[apiVrbls.USER.MODULE.RBAACKPROFILE] && resp.data[apiVrbls.USER.MODULE.RBAACKPROFILE][apiVrbls.USER.MODULE.RBAACKPROFILE_CHILD.ACESS_POLICY]) ? {
                    profiles: returnBackData(resp.data[apiVrbls.USER.MODULE.RBAACKPROFILE][apiVrbls.USER.MODULE.RBAACKPROFILE_CHILD.ACESS_POLICY]).values,
                    profilesWithNames: returnBackData(resp.data[apiVrbls.USER.MODULE.RBAACKPROFILE][apiVrbls.USER.MODULE.RBAACKPROFILE_CHILD.ACESS_POLICY]).names,
                } : {
                    profiles: [],
                    profilesWithNames: []
                }
            };
        } else {
            return null
        }
    } catch {
        return null
    }
}

export const userInfoInternalTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": {
            "api_name": "userinfo"
        },
        "data": {
            "data": null,
            "message": "user Not found",
            "status": 200
        }
    }
    try {
        if (resp) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}

export const resetPasswordTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": {
            "api_name": "resetPassword"
        },
        "data": {
            "data": null,
            "message": staticErrors.serverInactive,
            "status": 200
        }
    }
    try {
        if (resp.data && resp.message && resp.status) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}


export const changePasswordTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": {
            "api_name": "changePassword"
        },
        "data": {
            "data": null,
            "message": staticErrors.serverInactive,
            "status": 200
        }
    }
    try {
        if (resp.data && resp.message && resp.status) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}

export const forgotPasswordTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": {
            "api_name": "resetPassword"
        },
        "data": {
            "data": null,
            "message": staticErrors.serverInactive,
            "status": 200
        }
    }
    try {
        if (resp.data && resp.message) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}

export const logoutTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": {
            "api_name": "logout"
        },
        "data": {
            "data": null,
            "message": staticErrors.serverInactive,
            "status": 200
        }
    }
    try {
        if (resp.data && resp.message) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}



export const billingTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": {
            "api_name": "invoice_list"
        },
        "result_data": {
            "Invoices": []
        }
    }
    try {
        if (resp.data && resp.data.invoice) {
            return {
                "meta_data": {
                    "api_name": "invoice_list"
                },
                "result_data": {
                    "Invoices": resp.data.invoice.map((e: any) => {
                        return { ...e, "invoiceAmount": `${e[apiVrbls.BILLING.CURENCY]} ${e[apiVrbls.BILLING.INVOICE_AMT]}` }
                    })
                }
            }
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}


export const getuserListtransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "data": {
            "usersMetadata": {
                "all": 0,
                "inactive": 0,
                "invited": 0,
                "active": 0
            },
            "users": []
        },
        "message": "User created successsfully!!",
        "status": 200
    }
    try {
        if (resp.data && resp.data && resp.data.users && resp.data.users.length > 0) {
            return resp.data.users.map((f: any) => {
                return {
                    ...f,
                    name: `${f[apiVrbls.USER_MANAGMENT.FIREST_NAME]} ${f[apiVrbls.USER_MANAGMENT.LAST_NAME]}`
                }
            })
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}





export const adduSertransfomer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "data": "FAILED",
        "message": "Add user successfully.",
        "status": 200
    }
    try {
        if (resp.data && resp.message) {
            return resp.data
        } else {
            return "FAILED"
        }
    } catch {
        return "FAILED"
    }
}

export const editUsertransfomer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "data": "FAILED",
        "message": "User update successfully.",
        "status": 200
    }
    try {
        if (resp.data && resp.message) {
            return resp.data
        } else {
            return "FAILED"
        }
    } catch {
        return "FAILED"
    }
}



export const getlegalEntityListTrans = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": {
            "api_name": "legalEntityList"
        },
        "data": {
            "data": [],
            "message": staticErrors.serverInactive,
            "status": 200
        }
    }
    try {
        if (resp.data && resp.message) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}

export const getserviceTrans = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": {
            "api_name": "getservietTrans"
        },
        "data": {
            "data": [],
            "message": staticErrors.serverInactive,
            "status": 200
        }
    }
    try {
        if (resp.data && resp.message) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}


export const getDisputesTransformer = (data: any) => {
    const resp = JSON.parse(data);
    try {
        if (resp.data && resp.data.caseDetails && resp.data.caseDetails.length > 0) {
            return resp.data.caseDetails
        } else {
            return []
        }
    } catch {
        return []
    }
}

export const getSnowTicetsTransformer = (data: any) => {
    const resp = JSON.parse(data);
    try {
        if (resp.data && resp.data && resp.data.length > 0) {
            return resp.data
        } else {
            return []
        }
    } catch {
        return []
    }
}


export const getdisputeDetailstransformer = (data: any) => {
    const resp = JSON.parse(data);
    try {
        if (resp.data && resp.data.caseDetails) {
            return resp.data.caseDetails
        } else {
            null
        }
    } catch {
        return null
    }
}

export const getTicketDetailstransformer = (data: any) => {
    const resp = JSON.parse(data);
    try {
        if (resp.data) {
            return resp.data
        } else {
            null
        }
    } catch {
        return null
    }
}


export const getModuleTrans = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "meta_data": {
            "api_name": "getModuleTrans"
        },
        "data": {
            "data": [],
            "message": staticErrors.serverInactive,
            "status": 200
        }
    }
    try {
        if (resp.data && resp.message) {
            return resp
        } else {
            return defaultResp
        }
    } catch {
        return defaultResp
    }
}


export const getAccountDetilsTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "data": {
            "metadata": {
                "apiName": "getBillingDetails"
            },
            "data": null
        },
        "message": "SUCCESS",
        "status": 200
    }
    try {
        if (resp.data && resp.message) {
            return resp.data.data
        } else {
            defaultResp
        }
    } catch {
        return defaultResp
    }
}


export const raiseTicketTransformer = (data: any) => {
    const resp = JSON.parse(data);
    const defaultResp = {
        "data": {
            "createDispute": {
                "disputeCaseId": "12456789"
            }
        },
        "message": "SUCCESS",
        "status": 200
    }
    try {
        if (resp.data && resp.message == "SUCCESS" && resp.data.createDispute) {
            return resp.data.createDispute.disputeCaseId
        } else {
            return null;
        }
    } catch {
        return null;
    }
}


export const serviceAssAttachmentsTransformer = (data: any) => {
    const resp = JSON.parse(data);
    try {
        if (resp.data && resp.data && resp.data.attachmentInfo) {
            return resp.data.attachmentInfo
        } else {
            return [];
        }
    } catch {
        return [];
    }
}


export const RaiseticketServiceAsstransfor = (data: any) => {
    const resp = JSON.parse(data);
    try {
        if (resp.data && resp.data && resp.data.ticketNumber) {
            return resp.data.ticketNumber
        } else {
            return null;
        }
    } catch {
        return null;
    }
}



