import { Identifiable_ } from "./Identifiable";
import { PolicyType } from "./PolicyType";

export interface PolicyTemplate extends Identifiable_ {
  name: string,
  meta: string;
  type: PolicyType;
  description: string[];
  imgSrc: string;
}
