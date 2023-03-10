import { CaseDetailsType } from '../types/dispute-type'

export const getCaseDetails: CaseDetailsType = {
  caseDetails: [
    {
      "disputeCaseId": "001000153385",
      "disputeStatus": "WIP",
      "custReferenceNo": "VI000176",
      "invoiceNo": "272212G10189442",
      "circuitId": "091NAVI623031327539",
      "issueCode": "TERMINATION",
      "issueType": "Complaints",
      "disputeStartDate": "22-04-20",
      "disputeEndDate": "24-04-20",
      "contactPerson": "Akshay Garg",
      "primaryContactNo": "656788866",
      "custEmail": "abc@customeremail.com",
      "issueAttr3": "123344",
      "issueAttr4": "47757",
      "address": "address1 mumbai",
      "issueDetails": "Please resolve issue",
      "amountStuck": "101.00 ",
      "issueAttr1": "12345",
      "issueAttr2": "66778",
      "lastUpdatedOn": "06-01-2023",
      "creationDate": "06-01-2023",
      "cpaasRemarks": "null"
    },
    {
      "disputeCaseId": "001000153386",
      "disputeStatus": "WIP",
      "custReferenceNo": "VI000177",
      "invoiceNo": "272212G10189443",
      "circuitId": "091NAVI623031327549",
      "issueCode": "TERMINATION",
      "issueType": "Complaints",
      "disputeStartDate": "23-04-20",
      "disputeEndDate": "23-04-20",
      "contactPerson": "Sudhin VP",
      "primaryContactNo": "9895293665",
      "custEmail": "sudhin@customeremail.com",
      "issueAttr3": "1233441",
      "issueAttr4": "477571",
      "address": "Bangalore",
      "issueDetails": "Please resolve issue",
      "amountStuck": "101.00 ",
      "issueAttr1": "1233441",
      "issueAttr2": "477571",
      "lastUpdatedOn": "02-02-2023",
      "creationDate": "02-02-2023",
      "cpaasRemarks": "null"
    }
  ]
};

export const getDisputeById = {
  caseDetails: {
    "disputeCaseId": "001000153385",
    "disputeStatus": "WIP",
    "custReferenceNo": "VI000176",
    "invoiceNo": "272212G10189442",
    "circuitId": "091NAVI623031327539",
    "issueCode": "TERMINATION",
    "issueType": "Complaints",
    "disputeStartDate": "22-04-20",
    "disputeEndDate": "24-04-20",
    "contactPerson": "Akshay Garg",
    "primaryContactNo": "656788866",
    "custEmail": "abc@customeremail.com",
    "issueAttr3": "123344",
    "issueAttr4": "47757",
    "address": "address1 mumbai",
    "issueDetails": "Please resolve issue",
    "amountStuck": "101.00 ",
    "issueAttr1": "12345",
    "issueAttr2": "66778",
    "lastUpdatedOn": "06-01-2023",
    "creationDate": "06-01-2023",
    "cpaasRemarks": "null"
  }
};


export const addDispute = {
  "createDispute": {
    "disputeCaseId": "12456789"
  }
}
