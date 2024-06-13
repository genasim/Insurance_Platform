import mongoose, { Document, Schema } from "mongoose";

export interface ClaimDocument {
  claimId: mongoose.Types.ObjectId;
  description: string;
  document: string;
}

const claimDocumentSchema: Schema = new Schema<ClaimDocument>(
  {
    claimId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Claim",
      required: [true, "ClaimId is required"],
    },
    description: {
      type: String,
    },
    document: {
      type: String,
      required: [true, "Document in base64 is required"],
    },
  },
  { timestamps: true, versionKey: false }
);

const claimDocumentModel = mongoose.model<ClaimDocument & Document>(
  "claim-documents",
  claimDocumentSchema
);

export default claimDocumentModel;
