import {Identifiable, IdType} from "./Identifiable";
import {Currency} from "./Currency";

export interface PremiumPayments extends Identifiable {
    policyId: IdType
    amount: number,
    "amountCurrency": Currency,
    "paymentDate": Date
}