import mongoose from "mongoose";

export interface ClaimPayment {
    claimId: mongoose.Types.ObjectId,
    amount: string,
    amountCurrency: string,
    paymentDate: Date
}