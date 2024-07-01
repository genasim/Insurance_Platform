import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ClaimDTO_ } from "../../models/Claim";
import { ClaimDocumentDTO } from "../../models/ClaimDocument";
import { Policy_ } from "../../models/Policy";
import createClaim from "../../shared/services/create-claim";
import SubmitForm from "./SubmitForm";

const SubmitClaim: FC = () => {
  const [error, setError] = useState<Error>();

  const policy = useLoaderData() as Policy_;
  const navigate = useNavigate();

  const handleOnSubmit = async (
    claimData: ClaimDTO_,
    docsData: ClaimDocumentDTO[]
  ) => {
    try {
      await createClaim(claimData, docsData);
      navigate("..");
    } catch (error) {
      setError(error as Error);
    }
  };

  return (
    <Container>
      <Button
        className="mt-4 ms-4"
        variant="outline-secondary"
        onClick={() => navigate("/client/claims")}
      >
        <i className="bi bi-box-arrow-in-left mx-1"></i>
        Go back
      </Button>
      <h3 className="my-5">Fill your claim details</h3>
      <SubmitForm policy={policy} onSubmit={handleOnSubmit} />
      {error && <h3 className="text-danger">{error.message}</h3>}
    </Container>
  );
};

export default SubmitClaim;
