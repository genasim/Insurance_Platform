import { FC } from "react";
import Policy from "./PolicyFacade";
import {PolicyTemplate} from "../../models/PolicyTemplate";
import { useNavigate } from "react-router-dom";

export interface PolicyListProps {
  policies: PolicyTemplate[];
}

const PolicyList: FC<PolicyListProps> = ({ policies }) => {
  const navigate = useNavigate()

  const handlePolicyButtonClick = () => navigate("/client/policies")

  return (
    <div className="row">
      {policies.map((policy) => (
        <div className="col-12 col-lg-6 mb-4" key={policy._id}>
          <Policy.Card policy={policy} onButtonClick={handlePolicyButtonClick} />
        </div>
      ))}
    </div>
  );
};

export default PolicyList;
