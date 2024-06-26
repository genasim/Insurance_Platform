import {Identifiable, Identifiable_, IdType} from "./Identifiable";

export interface ClaimDocument extends Identifiable {
    claimId: IdType,
    claimNumber: string,
    description: string,
    document: string
}

export interface ClaimDocument_ extends Identifiable_ {
    claimId: IdType,
    claimNumber: number,
    description: string,
    document: string
}

export interface ClaimDocumentDTO extends Omit<ClaimDocument, "id" | "claimNumber" | "claimId"> {}
export interface ClaimDocumentDTO_ extends Omit<ClaimDocument_, "_id" | "claimNumber" | "claimId"> {}