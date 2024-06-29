import mongoose, {Document, Schema} from "mongoose";
import {ClaimPayment} from "../types/ClaimPayments";

const claimPaymentSchema = new Schema<ClaimPayment>(
    {
        claimId: {
            type: Schema.Types.ObjectId
        },
        amount: {
            type: String,
            required: true,
        },
        amountCurrency: {
            type: String,
            required: true,
        },
        paymentDate: {
            type: Schema.Types.Date,
            required: true,
        }
    }
);

const claimPaymentModel = mongoose.model<ClaimPayment & Document>(
    "claim-payments",
    claimPaymentSchema
);

export default claimPaymentModel;
