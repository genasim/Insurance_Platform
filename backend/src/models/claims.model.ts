import mongoose, { Document, Schema } from "mongoose";
import generateRandomIdNumber from "../utils/generateRandomIdNumber";

export enum EventType {
  STORM = "STORM",
  FIRE = "FIRE",
  //Todo Add other examples
}

export enum ClaimStatus {
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum Currency {
    BGN = "BGN",
    EUR = "EUR",
    GBP = "GBP"
}

export interface Claim {
  claimNumber: number;
  policyId: mongoose.Types.ObjectId;
  policyNumber: number;
  submissionDate: Date;
  eventDate: Date;
  eventType: EventType;
  eventDescription: string;
  claimedAmount: number;
  claimedAmountCurrency: string;
  claimantId: mongoose.Types.ObjectId;
  status: ClaimStatus;
}

const claimSchema: Schema = new Schema<Claim>(
  {
    claimNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: true,
    },
    policyNumber: {
      type: Number,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventType: {
      type: String,
      enum: Object.values(EventType),
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    claimedAmount: {
      type: Number,
      required: true,
    },
    claimedAmountCurrency: {
      type: String,
      enum: Object.values(Currency),
      required: true,
    },
    claimantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ClaimStatus),
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

claimSchema.pre("save", async function (next) {
  // 'this' refers to the document currently being created and contains the validated values
  const claim = this as unknown as Claim & Document;

  if (!claim.claimNumber) {
    let unique = false;
    while (!unique) {
      const claimNumber = generateRandomIdNumber(8);
      const existingClaim = await claimModel.findOne({ claimNumber });
      if (!existingClaim) {
        claim.claimNumber = claimNumber;
        unique = true;
      }
    }
  }

  next();
});

const claimModel = mongoose.model<Claim & Document>("claims", claimSchema);

export default claimModel;
