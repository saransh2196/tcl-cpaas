import { factory, primaryKey } from '@mswjs/data'

const db = factory({
    users: {
        id: primaryKey(String),
        emailId: String,
        password: String,
        phoneNumber: String,
        firstname: String,
        lastName: String,
        role: String,
        accountName: String,
        status: String,
        legalEntity: String,
        timeZone: String,
        createdDate: Date,
        realm: String,
        loginFirstTime: Boolean,
        zoneinfo: String,
        preferredCommunicationMode: String,
        rbacprofile: {
            name: String,
            accessPolicy: Array
        },
    },
    billingInvoice: {
        invoiceNumber: primaryKey(Number),
        customerLe: String,
        tataEntity: String,
        poNumber: String,
        paymentStatus: String,
        invoiceAmount: Number,
        invoiceDate: Date,
        dueDate: Date,
        paymentDateTime: String,
        timeZone: String,
        currency: String
    },

    tickets: {
        currentEscalationLevel: String,
        allowedForEscalation: String,
        creationDate: Date,
        rfoAccepted: String,
        assetid: String,
        issueType: String,
        ticketClosedTime: Date,
        ticketStatus: String,
        serviceAlias: String,
        shortDescription: String,
        impact: String,
        serviceType: String,
        description: String,
        ticketId: primaryKey(String),
        serviceIdentifier: String,
        updatedDate: Date,
        notes: Array,
        resolutionAccepted: String,
        contact: {
            name: String,
            primaryPhone: String,
            email: String
        },
        priority: String,
        totalOutageDuration: String,
        openedBy: {
            userId: String,
            email: String,
            firstName: String,
            lastName: String,
            phone: String
        }
    }
})


db.users.create({
    id: 'mahi-123',
    emailId: 'mahipalvijay@gmail.com',
    password: 'Mahi@123',
    firstname: 'Mahipal',
    lastName: 'Rawat',
    phoneNumber: '95716668631',
    role: 'Admin',
    accountName: 'TCL',
    realm: 'TCL-MAHI',
    loginFirstTime: false,
    zoneinfo: 'UTC',
    preferredCommunicationMode: 'EMAIL',
    rbacprofile: {
        "name": "UserProfile1",
        "accessPolicy": [
            "49:XYZ LIMITED::1:SMS::1:Billing Ticketing",
            "49:XYZ LIMITED::1:SMS::2:Billing Invoice"
        ]
    },
    status: 'active',
    legalEntity: 'LegalEntity1',
    timeZone: 'IST',
    createdDate: new Date().toDateString(),
})
db.users.create({
    id: 'evolutionco',
    emailId: 'evolutionco@test.com',
    password: '12345678',
    firstname: 'Evolution Co',
    lastName: 'Banglore',
    phoneNumber: '95716668631',
    role: 'Admin',
    accountName: 'TCL',
    realm: 'TCL-MAHI',
    loginFirstTime: false,
    zoneinfo: 'UTC',
    preferredCommunicationMode: 'EMAIL',
    rbacprofile: {
        "name": "UserProfile1",
        "accessPolicy": [
            "49:XYZ LIMITED::1:SMS::1:Billing Ticketing",
            "49:XYZ LIMITED::1:SMS::2:Billing Invoice"
        ]
    },
    status: 'active',
    legalEntity: 'LegalEntity1',
    timeZone: 'IST',
    createdDate: new Date().toDateString(),
})
db.users.create({
    id: 'evolutionco123',
    emailId: 'evolutionco@first.com',
    password: '12345678',
    firstname: 'Evolution Co',
    lastName: 'Banglore',
    phoneNumber: '95716668631',
    role: 'Admin',
    accountName: 'TCL',
    realm: 'TCL-MAHI',
    loginFirstTime: true,
    zoneinfo: 'UTC',
    preferredCommunicationMode: 'EMAIL',
    rbacprofile: {
        "name": "UserProfile1",
        "accessPolicy": [
            "49:XYZ LIMITED::1:SMS::1:Billing Ticketing",
            "49:XYZ LIMITED::1:SMS::2:Billing Invoice"
        ]
    },
    status: 'active',
    legalEntity: 'LegalEntity1',
    timeZone: 'IST',
    createdDate: new Date().toDateString(),
})
db.users.create({
    id: "a2fd942d-66c9-4628-bb12-8bd60dbb79fd",
    emailId: "rohitpatidar.007@gmail.com",
    password: 'Abc@12345',
    firstname: "rohit",
    lastName: "Patidar",
    phoneNumber: "9999999999",
    role: "admin",
    zoneinfo: "IST",
    loginFirstTime: false,
    accountName: "ROUTEML-MT-SMPP",
    realm: "tcl.admin",
    preferredCommunicationMode: 'PHONE',
    rbacprofile: {
        "name": "UserProfile1",
        "accessPolicy": [
            "48:ABC LIMITED::1:SMS::1:Billing Ticketing",
            "48:ABC LIMITED::1:SMS::2:Billing Invoice"
        ]
    },
    status: 'active',
    legalEntity: 'LegalEntity1',
    timeZone: 'IST',
    createdDate: new Date().toDateString(),
})



db.tickets.create({
    "currentEscalationLevel": "null",
    "allowedForEscalation": "null",
    "creationDate": "2023-01-12 13:04:58",
    "rfoAccepted": "null",
    "assetid": "ASB676J",
    "issueType": "Request",
    "ticketClosedTime": "2023-01-12",
    "ticketStatus": "WIP",
    "serviceAlias": "null",
    "shortDescription": "null",
    "impact": "No Impact",
    "serviceType": "null",
    "description": "091DELH6",
    "ticketId": "ticket12345",
    "serviceIdentifier": "null",
    "updatedDate": "2023-01-12 13:06:14",
    "notes": [
        {
            "date": "2023-01-12 13:04:58",
            "author": "TCL Admin1 IDP",
            "text": "this is sample ticket by test"
        },
        {
            "date": "2023-01-12 13:04:58",
            "author": "TCL Admin1 IDP",
            "text": "this is sample ticket by test"
        },
        {
            "date": "2023-01-12 13:04:58",
            "author": "TCL Admin1 IDP",
            "text": "this is sample ticket by test"
        }
    ],
    "resolutionAccepted": "null",
    "contact": {
        "name": "test",
        "primaryPhone": "1234567890",
        "email": "rohitpatidar1234@gmail.com"
    },
    "priority": "3 - Moderate",
    "totalOutageDuration": "null",
    "openedBy": {
        "userId": "rohitpatidar@gmail.com",
        "email": "rohitpatidar@gmail.com",
        "firstName": "TCL Admin1",
        "lastName": "IDP",
        "phone": "9999999999"
    }
})






const paymentStatusArr = ['completed', 'pending', 'overdue'];
const currencyArr = ['USD', 'INR'];
const timeZoneArr = ['IST', 'UST'];

const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomNumber = (min: number, max: number) => {
    return Number((Math.random() * (max - min + 1) + min).toFixed(2))
}

const generateInvoiceDate = () => {
    const invoiceDate = new Date();
    const dueDate = new Date();

    const randomInvoiceDate = randomInteger(1, 31);
    const randomInvoiceMonth = randomInteger(1, 12);

    const randomDueDate = randomInvoiceDate + randomInteger(1, 10)
    const randomDueMonth = randomInvoiceMonth + randomInteger(1, 3)

    invoiceDate.setDate(randomInvoiceDate)
    invoiceDate.setMonth(randomInvoiceMonth)

    dueDate.setDate(randomDueDate)
    dueDate.setMonth(randomDueMonth)

    return {
        invoiceDate: `${invoiceDate.getFullYear()}-${invoiceDate.getMonth() < 9 ? 0 : ''}${invoiceDate.getMonth() + 1}-${invoiceDate.getDate() < 10 ? 0 : ''}${invoiceDate.getDate()}`,
        dueDate: `${dueDate.getFullYear()}-${dueDate.getMonth() < 9 ? 0 : ''}${dueDate.getMonth() + 1}-${dueDate.getDate() < 10 ? 0 : ''}${dueDate.getDate()}`,
    }
}

Array.from({ length: 100 }).forEach((_, i) => {
    ++i
    const { invoiceDate, dueDate } = generateInvoiceDate();
    db.billingInvoice.create({
        invoiceNumber: i,
        customerLe: `LINKEDIN IRELAND UNLIMITED COMP`,
        tataEntity: `TATA COMMUNICATIONS (IRELAND) DESIGNATED ACTIVITY COMPANY`,
        poNumber: `NG${randomInteger(1, 100)}`,
        paymentStatus: paymentStatusArr[randomInteger(0, 2)],
        invoiceAmount: randomNumber(10, 30),
        invoiceDate: invoiceDate,
        dueDate: dueDate,
        paymentDateTime: `${randomInteger(0, 12)}:${randomInteger(0, 59)}`,
        timeZone: timeZoneArr[randomInteger(0, 1)],
        currency: currencyArr[randomInteger(0, 1)]
    })

})

export default db