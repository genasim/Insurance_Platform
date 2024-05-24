import {Identifiable} from "./Identifiable";
import {PolicyType} from "./PolicyType";
import {Currency} from "./Currency";

export interface PolicyPackage extends Identifiable {
    policyType: PolicyType,
    name: string,
    type: string,
    basePremium: number,
    basePremiumCurrency: Currency,
    duration: number,
    durationUnit: string,
    coverage: string[]
}