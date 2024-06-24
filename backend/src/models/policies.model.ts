import mongoose, { Document, Schema } from "mongoose";
import Currency from "../types/Currency";
import Policy from "../types/Policy";
import PolicyType from "../types/PolicyType";
import generateRandomIdNumber from "../utils/generateRandomIdNumber";
import getPolicyEndDate from "../utils/getPolicyEndDate";
import PolicyPackageModel from "./policy-packages.model";

const policyScema = new Schema<Policy>(
  {
    type: {
      type: String,
      enum: {
        values: Object.values(PolicyType),
        message: "{VALUE} is not a supported PolicyType",
      },
      required: [true, "Policy type is required"],
    },
    beginDate: {
      type: Schema.Types.Date,
      required: [true, "Start Date is required"],
    },
    endDate: {
      type: Schema.Types.Date,
      required: [true, "End Date is required"],
    },
    holderId: {
      type: Schema.Types.ObjectId,
      ref: "users",
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
      required: [true, "Policy Number is required"],
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

policyScema.pre("validate", async function (next) {
  const policy = this as unknown as Policy & Document;
  const polPackage = await PolicyPackageModel.findById(policy.packageId);

  if (!policy.policyNumber || policy.isNew) {
    let unique = false;
    while (!unique) {
      const policyNumber = generateRandomIdNumber(8);
      const existingClaim = await policyModel.countDocuments({ policyNumber });
      if (existingClaim === 0) {
        policy.policyNumber = policyNumber;
        unique = true;
      }
    }
  }

  if (!policy.endDate || policy.isNew) {
    const endDate = getPolicyEndDate(policy.beginDate, polPackage);
    policy.endDate = endDate;
  }

  if (!policy.premiumCurrency || policy.isNew) {
    policy.premiumCurrency = polPackage.basePremiumCurrency;
  }

  next();
});

policyScema.pre("save", async function (next) {
  // 'this' refers to the document currently being created and contains the validated values
  const policy = this as unknown as Policy & Document;

  const polPackage = await PolicyPackageModel.findById(policy.packageId);
  if (polPackage.policyType !== policy.type) {
    next(new Error("Package policy type doesn't match current policy"));
    return;
  }

  next();
});

const policyModel = mongoose.model("policies", policyScema);

export default policyModel;
