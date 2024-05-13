import {Identifiable, IdType} from "./Identifiable";

export interface ClaimDocument extends Identifiable {
    claimId: IdType,
    "claimNumber": string,
    "description": string,
    "document": number[]
}