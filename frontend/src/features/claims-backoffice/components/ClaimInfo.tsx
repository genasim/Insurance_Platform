import { FunctionComponent } from "react";
import { Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { Claim } from "../../../models/Claim";
import { ClaimDocument_ } from "../../../models/ClaimDocument";
import { PolicyPackage } from "../../../models/PolicyPackage";
import DocumentPreviewer from "./DocumentPreviewer";

interface ClaimInfoProps {
  claim: Claim;
  docs: ClaimDocument_[];
  policyPackage: PolicyPackage;
}

const ClaimInfo: FunctionComponent<ClaimInfoProps> = ({
  claim,
  docs,
  policyPackage,
}) => {
  return (
    <>
      <h4>Claim details:</h4>
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
          <Form.Label>Claimed amount</Form.Label>
          <InputGroup className="mb-4" as={Col} md="6">
            <InputGroup.Text>{claim.claimedAmountCurrency}</InputGroup.Text>
            <Form.Control disabled value={claim.claimedAmount} />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" className="mb-4">
          <Form.Label>Event Type</Form.Label>
          <Form.Control disabled value={claim.eventType} />
        </Form.Group>
        <Form.Group as={Col} md="4" className="mb-4">
          <Form.Label>Event Date</Form.Label>
          <Form.Control disabled value={claim.eventDate.toString()} />
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
      <hr className="my-4" />
      <h4>Policy Package:</h4>
      <Row>
        <Col md="6">
          <Row>
            <Form.Group className="mb-4">
              <Form.Label>Policy Type</Form.Label>
              <InputGroup>
                <InputGroup.Text>{policyPackage.name}</InputGroup.Text>
                <Form.Control value={policyPackage.policyType} disabled />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-4" as={Col} md="6">
              <Form.Label>Base Premium</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  {policyPackage.basePremiumCurrency}
                </InputGroup.Text>
                <Form.Control value={policyPackage.basePremium} disabled />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" as={Col} md="6">
              <Form.Label>Duration</Form.Label>
              <InputGroup>
                <InputGroup.Text>{policyPackage.durationUnit}</InputGroup.Text>
                <Form.Control value={policyPackage.duration} disabled />
              </InputGroup>
            </Form.Group>
          </Row>
        </Col>
        <Col>
          <Form.Label>Coverage:</Form.Label>
          <ListGroup>
            {policyPackage.coverage.map((scenario, idx) => (
              <ListGroup.Item
                key={scenario}
                className={`${idx % 2 === 1 ? "bg-body-tertiary" : ""}`}
              >
                {scenario}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <hr className="my-4" />
      {docs.length !== 0 ? (
        <>
          <h4>Attached files:</h4>
          {docs.map((doc) => (
            <DocumentPreviewer key={doc._id} document={doc} />
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
