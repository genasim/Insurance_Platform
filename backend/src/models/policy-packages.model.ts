import mongoose, { Document, Schema } from "mongoose";
import Currency from "../types/Currency";
import DurationUnit from "../types/DurationUnit";
import PolicyPackage from "../types/PolicyPackage";
import PolicyType from "../types/PolicyType";

const policyPackageSchema = new Schema<PolicyPackage>(
  {
    policyType: {
      type: String,
      enum: Object.values(PolicyType),
      required: [true, "PolicyType is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    basePremium: {
      type: Number,
      required: [true, "BasePremium is required"],
    },
    basePremiumCurrency: {
      type: String,
      enum: {
        values: Object.values(Currency),
        message: "{VALUE} is not a supported Currency",
      },
      required: [true, "Currency is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration cannot be lower than 1"],
      validate: [
        (value) => {
          return Number.isInteger(value);
        },
        "Duration must be an integer",
      ],
    },
    durationUnit: {
      type: String,
      enum: {
        values: Object.values(DurationUnit),
        message: "{VALUE} is not a supported DurationUnit",
      },
      required: [true, "DurationUnit is required"],
    },
    coverage: {
      type: [String],
      required: [true, "Coverage is required"],
      validate: [
        (value) => {
          return (value as string[]).length >= 1 ? true : false;
        },
        "Policy package must have at least one coverage",
      ],
    },
  },
  { timestamps: true, versionKey: false }
);

const PolicyPackageModel = mongoose.model<PolicyPackage & Document>(
  "policy-packages",
  policyPackageSchema
);

export default PolicyPackageModel;
