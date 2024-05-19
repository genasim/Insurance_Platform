import {Identifiable, IdType} from "./Identifiable";

export interface ClaimDocument extends Identifiable {
    claimId: IdType,
    claimNumber: string,
    description: string,
    document: string
}

export interface ClaimDocumentDTO extends Omit<ClaimDocument, "id" | "claimNumber" | "claimId"> {}