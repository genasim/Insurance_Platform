import { Identifiable } from "./Identifiable";
import { PolicyType } from "./PolicyType";

export interface PolicyTemplates extends Identifiable {
  meta: string;
  type: PolicyType;
  description: string[];
  imgSrc: string;
}
