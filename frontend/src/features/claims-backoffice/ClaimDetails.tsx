import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Claim_ } from "../../models/Claim";
import { ClaimDocument_ } from "../../models/ClaimDocument";
import { ClaimStatus } from "../../models/ClaimStatus";
import { PolicyPackage } from "../../models/PolicyPackage";
import ClaimInfo from "./components/ClaimInfo";
import ResolveClaimForm from "./components/ResolveClaimForm";
import { handleRequest } from "../../shared/BackEndFacade";
import { ClaimPaymentDTO } from "../../models/ClaimPayment";

type LoaderData = {
  claim: Claim_;
  documents: ClaimDocument_[];
  policyPackage: PolicyPackage;
};

const ClaimDetails: FC = () => {
  const [error, setError] = useState<Error>();
  const [willApprove, setWillApprove] = useState<boolean>(false);

  const { claim, documents, policyPackage } = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  const handleUpdate = async (status: ClaimStatus, claimPayment?: ClaimPaymentDTO) => {
    claim.status = status;

    try {
      const updatedClaim: Claim_ = await handleRequest(
        "PUT",
        "/api/backoffice/claims",
        { claim }
      ).then((res) => res.json());
      
      if (updatedClaim.status === ClaimStatus.APPROVED && claimPayment) {
        await handleRequest("POST", "/api/backoffice/claim-payments", {
          claimId: claimPayment.claimId,
          amount: claimPayment.amount,
          amountCurrency: claimPayment.amountCurrency,
        });
      }

      navigate("..");
    } catch (error) {
      console.error(error as Error);
      setError(error as Error);
    }
  };

  return (
    <Container>
      <Button
        className="mt-4 ms-4"
        variant="outline-secondary"
        onClick={() => navigate("..")}
      >
        <i className="bi bi-box-arrow-in-left mx-1"></i>
        Go back
      </Button>
      <div className="my-5">
        <ClaimInfo
          claim={claim}
          docs={documents}
          policyPackage={policyPackage}
        />
        <hr />
        <div className="d-flex gap-4 px-4">
          <Button
            className="d-inline-flex align-items-center"
            onClick={() => setWillApprove(true)}
            variant="outline-primary"
            disabled={willApprove}
          >
            Resolve
          </Button>
          <Button
            className="d-inline-flex align-items-center"
            onClick={() => handleUpdate(ClaimStatus.REJECTED)}
            variant="danger"
          >
            Reject
            <RxCross1 className="ms-1" />
          </Button>
          {error && <p className="text-danger">{error.message}</p>}
        </div>
        {willApprove && (
          <div className="my-5">
            <ResolveClaimForm
              claim={claim}
              onSubmit={(payment) => handleUpdate(ClaimStatus.APPROVED, payment)}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ClaimDetails;
