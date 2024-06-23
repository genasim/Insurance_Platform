import {Identifiable, IdType} from "./Identifiable";

export interface PremiumPayments extends Identifiable {
    policyId: IdType,
    amount: string,
    amountCurrency: string,
    paymentDate: string
}