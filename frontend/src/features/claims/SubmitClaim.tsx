import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ClaimDTO_ } from "../../models/Claim";
import { ClaimDocumentDTO } from "../../models/ClaimDocument";
import { Policy_ } from "../../models/Policy";
import SubmitForm from "./SubmitForm";
import useService from "../../shared/hooks/useService";
import Services from "../../shared/enums/Services";

const SubmitClaim: FC = () => {
  const [error, setError] = useState<Error>();
  const createClaim = useService(
    Services.CreateClaim,
    "You have successfully submited your claim"
  );

  const policy = useLoaderData() as Policy_;
  const navigate = useNavigate();

  const handleOnSubmit = async (
    claimData: ClaimDTO_,
    docsData: ClaimDocumentDTO[]
  ) => {
    try {
      await createClaim({ claimDTO: claimData, documents: docsData });
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
