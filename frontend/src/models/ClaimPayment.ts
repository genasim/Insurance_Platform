import { Currency } from "./Currency";
import { Identifiable_, IdType } from "./Identifiable";

export interface ClaimPayment extends Identifiable_ {
  claimId: IdType;
  amount: number;
  amountCurrency: Currency;
  paymentDate: Date;
}

export interface ClaimPaymentDTO
  extends Omit<ClaimPayment, "_id" | "paymentDate"> {}
