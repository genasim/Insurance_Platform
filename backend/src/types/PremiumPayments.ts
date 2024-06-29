import mongoose from "mongoose";

export interface PremiumPayment {
    policyId: mongoose.Types.ObjectId,
    amount: string,
    amountCurrency: string,
    paymentDate: Date
}