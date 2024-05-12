import {Identifiable, IdType} from "./Identifiable";

export interface ClaimDocument extends Identifiable {
    claimId: IdType,
    "description": string,
    "document": number[]
}