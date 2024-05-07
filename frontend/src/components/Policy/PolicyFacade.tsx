import React from "react";
import PolicyCard, { PolicyCardProps } from "./Card";
import PolicyList, { PolicyListProps } from "./List";

interface PolicyGroup {
  Card: React.FC<PolicyCardProps>;
  List: React.FC<PolicyListProps>;
}

export default {
  Card: PolicyCard,
  List: PolicyList,
} as PolicyGroup;
