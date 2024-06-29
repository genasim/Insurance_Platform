import mongoose, {Document, Schema} from "mongoose";
import {PremiumPayment} from "../types/PremiumPayments";

const premiumPaymentSchema = new Schema<PremiumPayment>(
    {
        policyId: {
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

const premiumPaymentModel = mongoose.model<PremiumPayment & Document>(
    "premium-payments",
    premiumPaymentSchema
);

export default premiumPaymentModel;
