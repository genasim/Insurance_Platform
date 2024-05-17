import { FunctionComponent } from "react";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import DocumentPreviewer from "./DocumentPreviewer";
import { Claim } from "../../../models/Claim";
import { ClaimDocument } from "../../../models/ClaimDocument";

interface ClaimInfoProps {
  claim: Claim;
  docs: ClaimDocument[];
}

const ClaimInfo: FunctionComponent<ClaimInfoProps> = ({ claim, docs }) => {
  return (
    <>
      <Row>
        <Form.Group as={Col} md="6" className="mb-4">
          <Form.Label>Policy Number</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-file-earmark-text-fill"></i>
            </InputGroup.Text>
            <Form.Control disabled value={claim.policyNumber} />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" className="mb-4">
          <Form.Label>Submission Date</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-calendar3"></i>
            </InputGroup.Text>
            <Form.Control disabled value={claim.submissionDate.toString()} />
          </InputGroup>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="4">
          <Form.Label>Sum for reimbursment</Form.Label>
          <InputGroup className="mb-4" as={Col} md="6">
            <InputGroup.Text>{claim.claimedAmountCurrency}</InputGroup.Text>
            <Form.Control disabled value={claim.claimedAmount} />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" className="mb-4">
          <Form.Label>Event Date</Form.Label>
          <Form.Control disabled value={claim.eventType} />
        </Form.Group>
        <Form.Group as={Col} md="4" className="mb-4">
          <Form.Label>Event Type</Form.Label>
          <Form.Control disabled value={claim.eventDate.toLocaleString()} />
        </Form.Group>
      </Row>
      <Form.Group className="mb-4">
        <Form.Label>Additional description:</Form.Label>
        <Form.Control
          disabled
          value={claim.eventDescription}
          as="textarea"
          rows={3}
        />
      </Form.Group>
      {docs.length !== 0 ? (
        <>
          <h4>Attached files:</h4>
          {docs.map((doc) => (
            <DocumentPreviewer key={doc.id} document={doc} />
          ))}
        </>
      ) : (
        <>
          <h3>No Files Attached</h3>
        </>
      )}
    </>
  );
};

export default ClaimInfo;
