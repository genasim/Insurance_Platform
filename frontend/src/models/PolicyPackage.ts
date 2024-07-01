import { Currency } from "./Currency";
import { DurationUnit } from "./DurationUnit";
import { Identifiable, Identifiable_ } from "./Identifiable";
import { PolicyType } from "./PolicyType";

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

export interface PolicyPackage_ extends Identifiable_ {
    policyType: PolicyType,
    name: string,
    type: string,
    basePremium: number,
    basePremiumCurrency: Currency,
    duration: number,
    durationUnit: DurationUnit,
    coverage: string[]
}