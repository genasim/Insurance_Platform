import { Identifiable } from "./Identifiable";
import { PolicyType } from "./PolicyType";

export interface PolicyTemplate extends Identifiable {
  meta: string;
  type: PolicyType;
  description: string[];
  imgSrc: string;
}
