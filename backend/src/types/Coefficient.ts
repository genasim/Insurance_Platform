import PolicyType from "./PolicyType";

export class CoefficientValue {
  constructor(public name: string, public value: number) {}
}

interface Coefficient {
  policyType: PolicyType;
  type: string;
  description: string;
  values: CoefficientValue[];
  isEnabled: boolean;
}

export default Coefficient;
