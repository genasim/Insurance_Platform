import {Identifiable} from "./Identifiable";
import {PolicyType} from "./PolicyType";

export interface PolicyTemplates extends Identifiable {
    name: string,
    type: PolicyType,
    description: string
}