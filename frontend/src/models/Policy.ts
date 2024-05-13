import {Identifiable} from "./Identifiable";

export interface Policy extends Identifiable {
    "policyNumber": string,
    "holderId": string,
    "type": string,
    "package": string,
    "beginDate": Date,
    "endDate": Date,
    "purchaseDate": Date,
}