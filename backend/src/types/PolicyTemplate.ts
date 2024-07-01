import PolicyType from "./PolicyType";

interface PolicyTemplate  {
  name: string,
  meta: string;
  type: PolicyType;
  description: string[];
  imgSrc: string;
}

export default PolicyTemplate
