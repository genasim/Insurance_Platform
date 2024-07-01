import Currency from "./Currency";
import DurationUnit from "./DurationUnit";
import PolicyType from "./PolicyType";

interface PolicyPackage {
  policyType: PolicyType;
  name: string;
  type: string;
  basePremium: number;
  basePremiumCurrency: Currency;
  duration: number;
  durationUnit: DurationUnit;
  coverage: string[];
}

export default PolicyPackage;
