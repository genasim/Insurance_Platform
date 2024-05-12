import {Identifiable, IdType} from "./Identifiable";
import {Currency} from "./Currency";

export interface ClaimPayment extends Identifiable {
    claimId: IdType,
    amount: number,
    amountCurrency: Currency,
    paymentDate: Date
}

