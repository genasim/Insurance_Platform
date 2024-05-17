import { FC } from "react";
import { Button, Container } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import { useLoaderData } from "react-router-dom";
import { Claim } from "../../models/Claim";
import { ClaimDocument } from "../../models/ClaimDocument";

type LoaderData = {
  claim: Claim;
  docs: ClaimDocument[];
};

const ClaimDetails: FC = () => {
  const { claim, docs } = useLoaderData() as LoaderData;

  return (
    <Container>
      <hr />
      <div>
        <Button className="mx-3" variant="success">
          <RxCross1 className="me-1" />
          Resolve
        </Button>
        <Button className="d-inline-flex align-items-center" variant="danger">
          Reject
          <RxCross1 className="ms-1" />
        </Button>
      </div>
    </Container>
  );
};

export default ClaimDetails;
