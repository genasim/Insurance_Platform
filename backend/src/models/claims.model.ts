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
  GBP = "GBP",
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
      minlength: 8,
      unique: true,
    },
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: [true, "PolicyId is required"],
    },
    policyNumber: {
      type: Number,
      minlength: 8,
      required: [true, "Policy Number is required"],
    },
    eventDate: {
      type: Date,
      required: [true, "Event Date is required"],
    },
    eventType: {
      type: String,
      enum: {
        values: Object.values(EventType),
        message: "{VALUE} is not a supported eventType",
      },
      required: [true, "Event Type is required"],
    },
    eventDescription: {
      type: String,
      required: [true, "Event Description is required"],
    },
    claimedAmount: {
      type: Number,
      required: [true, "Claimed Amount is required"],
    },
    claimedAmountCurrency: {
      type: String,
      enum: {
        values: Object.values(Currency),
        message: "{VALUE} is not a supported claimedAmountCurrency",
      },
      required: [true, "Claimed Amount Currency is required"],
    },
    claimantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ClaimantId is required"],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(ClaimStatus),
        message: "{VALUE} is not a supported status",
      },
      required: [true, "Status is required"],
      default: ClaimStatus.SUBMITTED,
    },
  },
  { timestamps: true, versionKey: false }
);

claimSchema.pre("save", async function (next) {
  // 'this' refers to the document currently being created and contains the validated values
  const claim = this as unknown as Claim & Document;

  if (!claim.claimNumber || claim.isNew) {
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
