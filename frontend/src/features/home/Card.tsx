import { FC } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {PolicyTemplate} from "../../models/PolicyTemplate";

export interface PolicyCardProps {
  policy: PolicyTemplate;
  onButtonClick?: () => void;
}

const PolicyCard: FC<PolicyCardProps> = ({ policy, onButtonClick }) => {
  console.log(policy);

  return (
    <Card className="rounded-5 shadow border">
      <Container>
        <Row>
          <Col>
            <Card.Img src={policy.imgSrc} className="p-4" />
          </Col>
          <Col className="col d-flex flex-column">
            <Card.Title className="fs-3 mb-0 mt-3">{policy.type}</Card.Title>
            <Card.Text className="my-1">{policy.meta}</Card.Text>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div className="my-0">
                {policy.description.map((descr) => (
                  <Card.Text key={descr} className="fs-6 mb-1">
                    <IoMdCheckmarkCircleOutline /> {descr}
                  </Card.Text>
                ))}
              </div>
              <Button
                variant="primary"
                onClick={onButtonClick}
                className="w-100 rounded-pill"
              >
                Buy online insurance
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default PolicyCard;
