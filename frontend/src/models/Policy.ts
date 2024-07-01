import {IdType, Identifiable, Identifiable_} from "./Identifiable";
import { PolicyType } from "./PolicyType";

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

export interface Policy_ extends Identifiable_ {
    policyNumber: number,
    holderId: IdType,
    type: PolicyType,
    packageId: IdType,
    premium: string,
    premiumCurrency: string,
    beginDate: string,
    endDate: string,
    purchaseDate: string,
}

export interface PolicyDto {
    type: PolicyType,
    packageId: IdType,
    beginDate: string,
    coefficients: {id: IdType, value: number}[]
}