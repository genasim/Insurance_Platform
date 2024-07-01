import mongoose from "mongoose";

export interface ClaimDocument {
  claimId: mongoose.Types.ObjectId;
  description: string;
  document: string;
  claimNumber: string;
}

export default ClaimDocument;
