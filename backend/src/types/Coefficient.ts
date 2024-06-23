import PolicyType from "./PolicyType";

export class CoefficientValue {
  constructor(private name: string, private value: number) {}
}

interface Coefficient {
  policyType: PolicyType;
  type: string;
  description: string;
  values: CoefficientValue[];
  isEnabled: boolean;
}

export default Coefficient;
