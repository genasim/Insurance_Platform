import mongoose from "mongoose";
import Currency from "./Currency";

interface Policy {
  policyNumber: number;
  holderId: mongoose.Types.ObjectId;
  type: string;
  packageId: mongoose.Types.ObjectId;
  premium: number;
  premiumCurrency: Currency;
  beginDate: Date;
  endDate: Date;
}

export default Policy;
