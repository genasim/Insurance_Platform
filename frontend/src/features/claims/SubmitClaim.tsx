import randomstring from "randomstring";
import { FC } from "react";
import { Button, Container } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ClaimDTO } from "../../models/Claim";
import { ClaimDocument, ClaimDocumentDTO } from "../../models/ClaimDocument";
import { Policy } from "../../models/Policy";
import API, { Tables } from "../../shared/api-client/ApiClient";
import SubmitForm from "./SubmitForm";

const SubmitClaim: FC = () => {
  const policy = useLoaderData() as Policy;
  const navigate = useNavigate();

  const handleOnSubmit = async (
    claimData: ClaimDTO,
    docsData: ClaimDocumentDTO[]
  ) => {
    const claimNumber: string = randomstring.generate({
      length: 8,
      charset: ["numeric"],
    });
    const claim = await API.create(Tables.CLAIMS, {
      ...claimData,
      claimNumber,
    });
    docsData.forEach(
      async (doc) =>
        await API.create<ClaimDocument>(Tables.CLAIM_DOCUMENTS, {
          ...doc,
          claimId: claim.id,
          claimNumber,
        })
    );
  };

  return (
    <Container>
      <Button
        className="mt-3"
        variant="outline-secondary"
        onClick={() => navigate("/client/claims")}
      >
        <i className="bi bi-box-arrow-in-left mx-1"></i>
        Go back
      </Button>
      <h3 className="my-5">Fill your claim details</h3>
      <SubmitForm policy={policy} onSubmit={handleOnSubmit} />
    </Container>
  );
};

export default SubmitClaim;
