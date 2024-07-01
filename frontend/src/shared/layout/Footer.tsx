import { FC, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import InsurancesGrid from "./InsuransesGrid";
import { handleRequest } from "../BackEndFacade";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { PolicyTemplate } from "../../models/PolicyTemplate";

const Footer: FC = () => {
  const [insuranceItems, setInsuranceItems] = useState<string[]>([])
  useAsyncEffect(async () => {
    const templates = await handleRequest("GET", "/api/auth/policy-types").then(result => result.json());
    setInsuranceItems((templates as PolicyTemplate[]).map(template => template.name));
  }, [])

  return (
    <footer
      style={{ borderRadius: "8em 8em 0 0" }}
      className="d-none d-lg-block w-100 mt-2 bg-primary-subtle text-secondary pt-5 pb-2"
    >
      <Container>
        <Row>
          <Col xs lg="3">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="fs-6">
              <i className="bi bi-phone-vibrate"></i> +359 88 762 1020
            </p>
            <p className="fs-6">
              <i className="bi bi-patch-question"></i> inquire@safeinsure.org
            </p>
          </Col>
          <Col xs lg="2">
            <h3 className="fs-4 mb-4">Site map</h3>
            <Link to="/" className="text-secondary fs-6 text-decoration-none">
              <p>HOME</p>
            </Link>
          </Col>
          <Col>
            <h3 className="fs-4 mb-4">Insurances</h3>
            <InsurancesGrid items={insuranceItems} cols={3} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
