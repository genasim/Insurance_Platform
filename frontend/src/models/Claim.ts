import {Identifiable, IdType} from "./Identifiable";
import {ClaimStatus} from "./ClaimStatus";
import {EventType} from "./EventType";

export interface Claim extends Identifiable {
    "claimNumber": string,
    "policyId": IdType,
    "policyNumber": string,
    "submissionDate": Date,
    "eventDate": Date,
    "eventType": EventType,
    "eventDescription": string,
    "claimedAmount": number,
    "claimedAmountCurrency": string,
    "claimantId": IdType,
    "status": ClaimStatus
}

export interface ClaimDTO extends Omit<Claim, "id" | "claimNumber"> {}
