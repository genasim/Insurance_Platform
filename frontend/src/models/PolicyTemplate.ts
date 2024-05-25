import { Identifiable } from "./Identifiable";
import { PolicyType } from "./PolicyType";

export interface PolicyTemplate extends Identifiable {
  name: string,
  meta: string;
  type: PolicyType;
  description: string[];
  imgSrc: string;
}
