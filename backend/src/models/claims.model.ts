import mongoose, { Document, Schema } from "mongoose";
import generateRandomIdNumber from "../utils/generateRandomIdNumber";
import Currency from "../types/Currency";
import EventType from "../types/EventType";
import ClaimStatus from "../types/ClaimStatus";
import Claim from "../types/Claim";

const claimSchema: Schema = new Schema<Claim>(
  {
    claimNumber: {
      type: String,
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
  { timestamps: { createdAt: "submissionDate", updatedAt: true }, versionKey: false }
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
        // claim.claimNumber = claimNumber;
        unique = true;
      }
    }
  }

  next();
});

const claimModel = mongoose.model<Claim & Document>("claims", claimSchema);

export default claimModel;
