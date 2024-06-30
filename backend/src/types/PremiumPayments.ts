import mongoose from "mongoose";

export interface PremiumPayment {
    policyId: mongoose.Types.ObjectId,
    amount: number,
    amountCurrency: string,
    paymentDate: Date
}