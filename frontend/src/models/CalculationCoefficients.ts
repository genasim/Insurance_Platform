import {Identifiable, IdType} from "./Identifiable";
import {PolicyType} from "./PolicyType";
import {CalculationCoefficientValue} from "./CalculationCoefficientValue";

export interface CalculationCoefficients extends Identifiable {
    id: IdType,
    policyType: PolicyType,
    type: string,
    description: string,
    values: CalculationCoefficientValue[]
    isEnabled: boolean
}