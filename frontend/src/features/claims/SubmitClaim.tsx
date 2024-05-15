import { FC } from "react";
import {
  Container
} from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { Policy } from "../../models/Policy";
import SubmitForm from "./SubmitForm";
import { Claim } from "../../models/Claim";
import { ClaimDocument } from "../../models/ClaimDocument";

const SubmitClaim: FC = () => {
  const policy = useLoaderData() as Policy;

  const handleOnSubmit = async (claim: Claim, docs: ClaimDocument[]) => {
    console.log(claim, docs);
    
  }

  return (
    <Container>
      <h3 className="my-5">
        Fill your claim details
      </h3>
      <SubmitForm policy={policy} onSubmit={handleOnSubmit} />
    </Container>
  );
};

export default SubmitClaim;
