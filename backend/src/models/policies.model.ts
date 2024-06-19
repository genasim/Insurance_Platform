import mongoose, { Schema, Document } from "mongoose";
import Policy from "../types/Policy";
import Currency from "../types/Currency";
import generateRandomIdNumber from "../utils/generateRandomIdNumber";
import PolicyType from "../types/PolicyType";

const policyScema = new Schema<Policy>(
  {
    type: {
      type: String,
      enum: {
        values: Object.values(PolicyType),
        message: "{VALUE} is not a supported PolicyType"
      },
      required: [true, "Policy type is required"],
    },
    endDate: {
      type: Schema.Types.Date,
      required: [true, "End Date is required"],
    },
    holderId: {
      text: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "HolderId is required"],
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "policy-packages",
      required: [true, "PackageId is required"],
    },
    policyNumber: {
      type: Number,
      unique: true,
      minlength: [8, "Policy number {VALUE} must be 8 digits longs"],
      maxlength: [8, "Policy number {VALUE} must be 8 digits longs"],
    },
    premium: {
      type: Number,
      required: [true, "Policy Premium is required"],
      min: [0.01, "Policy premium {VALUE} cannot be 0 or negative"],
    },
    premiumCurrency: {
      type: String,
      enum: {
        values: Object.values(Currency),
        message: "{VALUE} is not a supported currency",
      },
      required: [true, "Currency is required"],
    },
  },
  {
    timestamps: { createdAt: "purchaseDate", updatedAt: true },
    versionKey: false,
  }
);

policyScema.pre("save", async function (next) {
    // 'this' refers to the document currently being created and contains the validated values
    const policy = this as unknown as Policy & Document;
  
    if (!policy.policyNumber || policy.isNew) {
      let unique = false;
      while (!unique) {
        const policyNumber = generateRandomIdNumber(8);
        const existingClaim = await policyModel.findOne({ policyNumber });
        if (!existingClaim) {
          policy.policyNumber = policyNumber;
          unique = true;
        }
      }
    }
  
    next();
  });

const policyModel = mongoose.model("policies", policyScema);

export default policyModel;
