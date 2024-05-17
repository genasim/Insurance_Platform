import { FC } from "react";
import { Button, Container } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import { useLoaderData } from "react-router-dom";
import { Claim } from "../../models/Claim";
import { ClaimDocument } from "../../models/ClaimDocument";
import ClaimInfo from "./components/ClaimInfo";
import { SiTicktick } from "react-icons/si";

type LoaderData = {
  claim: Claim;
  docs: ClaimDocument[];
};

const ClaimDetails: FC = () => {
  const { claim, docs } = useLoaderData() as LoaderData;

  return (
    <Container>
      <div className="my-5">
        <ClaimInfo claim={claim} docs={docs} />
        <hr />
        <div className="d-flex gap-4 px-4">
          <Button
            className="d-inline-flex align-items-center"
            variant="success"
          >
            <SiTicktick className="me-1" />
            Resolve
          </Button>
          <Button className="d-inline-flex align-items-center" variant="danger">
            Reject
            <RxCross1 className="ms-1" />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ClaimDetails;
