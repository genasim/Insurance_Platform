import React, { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "../shared/components/Logo";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Footer: FC = () => {
  return (
    <footer className="mt-2 bg-primary-subtle text-secondary pt-5 pb-2 rounded-top-pill">
      <Container>
        <Row>
          <Col xs lg="3">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="fs-5">
              <i className="bi bi-phone-vibrate"></i> +359 88 762 1020
            </p>
            <p className="fs-5">
              <i className="bi bi-patch-question"></i> inquire@safeinsure.org
            </p>
          </Col>
          <Col xs lg="2">
            <h3 className="fs-3 mb-4">Site map</h3>
            <Link to="/" className="text-secondary fs-5 text-decoration-none">
              <p>HOME</p>
            </Link>
          </Col>
          <Col>
            <h3 className="fs-3 mb-4">Insurances</h3>
            <p className="fs-5">
              <MdOutlineKeyboardDoubleArrowRight /> Car insurance
            </p>
            <p className="fs-5">
              <MdOutlineKeyboardDoubleArrowRight /> Health insurance
            </p>
            <p className="fs-5">
              <MdOutlineKeyboardDoubleArrowRight /> Health insurance
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
