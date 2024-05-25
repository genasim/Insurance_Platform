import { FC } from "react";
import { PolicyTemplates } from "../../../models/PolicyTemplates";
import Policy from "./PolicyFacade";

export interface PolicyListProps {
  policies: PolicyTemplates[];
}

const PolicyList: FC<PolicyListProps> = ({ policies }) => {
  return (
    <div className="row">
      {policies.map((policy) => (
        <div className="col-12 col-lg-6 mb-4" key={policy.id}>
          <Policy.Card policy={policy} />
        </div>
      ))}
    </div>
  );
};

export default PolicyList;
