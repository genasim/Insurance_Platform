import {Identifiable, Identifiable_} from "./Identifiable";
import {PolicyType} from "./PolicyType";
import {CalculationCoefficientValue} from "./CalculationCoefficientValue";

export interface CalculationCoefficient extends Identifiable {
    policyType: PolicyType,
    type: string,
    description: string,
    values: CalculationCoefficientValue[]
    isEnabled: boolean
}

export interface CalculationCoefficient_ extends Identifiable_ {
    policyType: PolicyType,
    type: string,
    description: string,
    values: CalculationCoefficientValue[]
    isEnabled: boolean
}