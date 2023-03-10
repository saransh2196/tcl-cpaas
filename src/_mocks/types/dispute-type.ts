import { PathString } from "react-hook-form"

interface CaseDetails {
  disputeCaseId: string,
  disputeStatus: string,
  custReferenceNo: string,
  invoiceNo: string,
  circuitId: string,
  issueCode: string,
  issueType: string,
  disputeStartDate: string,
  disputeEndDate: string,
  contactPerson: string,
  primaryContactNo: string,
  custEmail?: string,
  issueAttr3?: string,
  issueAttr4?: string,
  address: string,
  issueDetails: string,
  amountStuck: PathString,
  issueAttr1?: string,
  issueAttr2?: string,
  lastUpdatedOn: string,
  creationDate: string,
  cpaasRemarks?: string
}

export interface CaseDetailsType {
  caseDetails: CaseDetails[]
}
