import {Identifiable} from "./Identifiable";

export interface Policy extends Identifiable {
    policyNumber: string,
    holderId: string,
    type: string,
    packageId: string,
    premium: string,
    premiumCurrency: string,
    beginDate: string,
    endDate: string,
    purchaseDate: string,
}