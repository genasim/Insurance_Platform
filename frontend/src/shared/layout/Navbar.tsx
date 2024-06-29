import { useContext, useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Right } from "../../models/Rights";
import Logo from "../components/Logo";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";
import useJwt from "../hooks/useJwt";
import LoggedInContext from "../hooks/useLoggedIn";

const Navbar = () => {
  const jwt = useJwt();
  const [rights, setRights] = useState<Right[]>([]);
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);

  useEffect(() => {
    if (jwt?.rights) {
      setRights(jwt.rights);
    } else {
      setRights([]);
    }
  }, [jwt]);

  const handleLogout = () => {
    sessionStorage.removeItem(AuthStorageKeys.TOKEN);
    setLoggedIn(false);
  };

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
          className="fs-5 collapse navbar-collapse justify-content-end align-center"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {rights.includes(Right.CLIENT) && (
                <NavDropdown title="Clients">
                  <NavDropdown.Item>
                    <Link to="/client/policies" className="nav-link">
                      Purchase a policy
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/client/claims" className="nav-link">
                      Submit a claim
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
            )}
            {rights.includes(Right.EXPERT) && (
                <NavDropdown title="Experts">
                  <NavDropdown.Item>
                    <Link to="/backoffice/claims" className="nav-link">
                      Claims
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/backoffice/policies" className="nav-link">
                      Policies
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/backoffice/claim-payments" className="nav-link">
                      Claim payments
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/backoffice/premium-payments" className="nav-link">
                      Premium payments
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
            )}
            {rights.includes(Right.ACTUARY) && (
                <li className="nav-item">
                  <Link className="nav-link" to="/actuary">
                    Actuary
                  </Link>
                </li>
            )}
            {rights.includes(Right.ADMIN) && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/notifications">
                Notifications
              </Link>
            </li>
            {!loggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
            )}
            {loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
