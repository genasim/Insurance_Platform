import {Identifiable} from "./Identifiable";

export interface PremiumPayments extends Identifiable {
    amount: string,
    amountCurrency: string,
    paymentDate: string
}