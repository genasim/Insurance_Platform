import mongoose from "mongoose";
import ClaimStatus from "./ClaimStatus";
import EventType from "./EventType";

interface Claim {
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

export default Claim;
