import mongoose, {Document, Schema} from "mongoose";
import {ClaimPayment} from "../types/ClaimPayments";
import Currency from "../types/Currency";

const claimPaymentSchema = new Schema<ClaimPayment>(
    {
        claimId: {
            type: Schema.Types.ObjectId,
            ref: "Claims",
            required: [true, "ClaimId is required"]
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
        },
        amountCurrency: {
            type: String,
            enum: {
                values: Object.values(Currency),
                message: "{VALUE} is not a supported Currency",
            },
            required: [true, "Amount Currency is required"],
        },
    },
    { timestamps: { createdAt: "paymentDate", updatedAt: true }, versionKey: false },
);

const claimPaymentModel = mongoose.model<ClaimPayment & Document>(
    "claim-payments",
    claimPaymentSchema
);

export default claimPaymentModel;
