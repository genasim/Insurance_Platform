import React from "react";
import { useNavigate } from "react-router-dom";
import { PolicyDto } from "../../models/Policy";
import Title from "../../shared/components/Title";
import PolicyForm from "./PolicyForm";
import useService from "../../shared/hooks/useService";
import Services from "../../shared/enums/Services";

const PolicySubmission: React.FC = () => {
  const navigate = useNavigate();
  const createPolicy = useService(
    Services.CreatePolicy,
    "You have successfully purchased your new policy!"
  );

  const onPolicySubmit = (policyDto: PolicyDto) => {
    createPolicy({ payload: policyDto })
      .then((policy) => {
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <div className="container-md">
      <Title
        title="Purchase a policy"
        meta="Fill out the form and get your online policy today"
      />
      <PolicyForm onSubmit={onPolicySubmit} />
    </div>
  );
};

export default PolicySubmission;
