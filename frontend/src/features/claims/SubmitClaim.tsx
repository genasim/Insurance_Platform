import { FC } from "react";
import { Container } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { ClaimDTO } from "../../models/Claim";
import { ClaimDocumentDTO } from "../../models/ClaimDocument";
import { Policy } from "../../models/Policy";
import SubmitForm from "./SubmitForm";

const SubmitClaim: FC = () => {
  const policy = useLoaderData() as Policy;

  const handleOnSubmit = async (claim: ClaimDTO, docs: ClaimDocumentDTO[]) => {
    console.log(claim, docs);
  };

  return (
    <Container>
      <h3 className="my-5">Fill your claim details</h3>
      <SubmitForm policy={policy} onSubmit={handleOnSubmit} />
    </Container>
  );
};

export default SubmitClaim;
