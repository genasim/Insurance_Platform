import React from "react";
import { useNavigate } from "react-router-dom";
import { PolicyDto } from "../../models/Policy";
import Title from "../../shared/components/Title";
import createPolicy from "../../shared/services/create-policy";
import PolicyForm from "./PolicyForm";

const PolicySubmission: React.FC = () => {
  const navigate = useNavigate();

  const onPolicySubmit = (policyDto: PolicyDto) => {
    createPolicy(policyDto)
      .then((policy) => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
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
