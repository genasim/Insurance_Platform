import mongoose, {Document, Schema} from "mongoose";
import {PremiumPayment} from "../types/PremiumPayments";
import Currency from "../types/Currency";

const premiumPaymentSchema = new Schema<PremiumPayment>(
    {
        policyId: {
            type: Schema.Types.ObjectId,
            ref: "Policy",
            required: [true, "PolicyId is required"]
        },
        amount: {
            type: String,
            required: [true, "Amount is required"],
        },
        amountCurrency: {
            type: String,
            enum: {
                values: Object.values(Currency),
                message: "{VALUE} is not a supported Currency",
            },
            required: [true, "Ammount Currency is required"],
        },
        paymentDate: {
            type: Schema.Types.Date,
            required: [true, "Payment Date is required"],
        }
    },
    { timestamps: true, versionKey: false },
);

const premiumPaymentModel = mongoose.model<PremiumPayment & Document>(
    "premium-payments",
    premiumPaymentSchema
);

export default premiumPaymentModel;
