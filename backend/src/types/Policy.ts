import mongoose from "mongoose";
import Currency from "./Currency";

interface Policy {
  policyNumber: string;
  holderId: mongoose.Types.ObjectId;
  holderName: string;
  type: string;
  packageId: mongoose.Types.ObjectId;
  package: string;
  premium: number;
  premiumCurrency: Currency;
  coverage: string[],
  beginDate: Date;
  endDate: Date;
  purchaseDate: Date;
}

export default Policy;
