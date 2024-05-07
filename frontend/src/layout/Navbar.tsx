import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "../shared/components/Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{ borderRadius: "0 0 8em 8em" }}
      className="navbar navbar-expand-md bg-primary-subtle py-4 px-5"
    >
      <div className="container-xxl">
        <div className="d-none d-sm-block">
          <Logo />
        </div>
        <button
          className="navbar-toggler float-end"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav"
          aria-controls="main-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          id="main-nav"
          className="collapse navbar-collapse justify-content-end align-center"
        >
          <ul className="navbar-nav">
            <li className="nav-item fs-5">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link to="/client/policies" className="nav-link">
                Policies
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link to="/client/claims" className="nav-link">
                Claims
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link to="/backoffice" className="nav-link">
                BackOffice
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
