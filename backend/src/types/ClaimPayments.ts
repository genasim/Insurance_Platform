import mongoose from "mongoose";

export interface ClaimPayment {
    claimId: mongoose.Types.ObjectId,
    amount: number,
    amountCurrency: string,
    paymentDate: Date
}