export class AUTH_URLS {
    public static readonly LOGIN = "orchestration/user/onboarding/login";
    public static readonly REGISTER = "/orchestration/user/onboarding/register";
    public static readonly VERIFY_EMAIL = "/orchestration/user/onboarding/verifyEmail";
    public static readonly VERIFY_PHONE_NUMBER = "/orchestration/user/onboarding/verifyPhoneNumber";
}

export class ACCOUNT_URLS {
    public static readonly GET_DETAILS = "/orchestration/user/account_details/getAccountDetails";
    public static readonly SAVE_DETAILS = "/orchestration/user/account_details/saveAccountDetails";
    public static readonly CHANGE_PASSWORD = "/orchestration/user/account_details/changePassword";
    public static readonly GET_BILLING_DETAILS = "/orchestration/user/account_details/getBillingDetails";
    public static readonly SEND_INVOICE_TO_CONTACT = "/orchestration/user/account_details/sendInvoiceToContact";
}

export class BILLING_URLS {
    public static readonly GET_BILLING_INVOICES = "/orchestration/billing/invoices/getInvoices";
    public static readonly GET_BILLING_TICKETS = "/orchestration/billing/tickets/getBillingTickets";
}