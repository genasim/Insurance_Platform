import {Identifiable, Identifiable_, IdType} from "./Identifiable";
import {ClaimStatus} from "./ClaimStatus";
import {EventType} from "./EventType";
import { Currency } from "./Currency";

export interface Claim extends Identifiable {
    claimNumber: string,
    policyId: IdType,
    policyNumber: string,
    submissionDate: Date,
    eventDate: Date,
    eventType: EventType,
    eventDescription: string,
    claimedAmount: number,
    claimedAmountCurrency: string,
    claimantId: IdType,
    status: ClaimStatus
}

export interface Claim_ extends Identifiable_ {
    claimNumber: string,
    policyId: IdType,
    policyNumber: number,
    submissionDate: Date,
    eventDate: Date,
    eventType: EventType,
    eventDescription: string,
    claimedAmount: number,
    claimedAmountCurrency: Currency,
    claimantId: IdType,
    status: ClaimStatus
}

export interface ClaimDTO extends Omit<Claim, "id" | "claimNumber"> {}
export interface ClaimDTO_ extends Omit<Claim_, "_id" | "claimNumber" | "submissionDate"> {}
