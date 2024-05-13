import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
import Logo from "../shared/components/Logo";


interface NavbarProps {
    toggleIsLoggedIn: () => void
}

const Navbar = ({toggleIsLoggedIn}: NavbarProps) => {
    const item = sessionStorage.getItem("token");
    //ToDo fix rights
    let login = null;
    let register = null;
    let logout = null;

    let handleLogout = () => {
        sessionStorage.removeItem("token");
        toggleIsLoggedIn();
    };

    if (!item) {
        login =
            <li className="nav-item fs-5">
                <Link className="nav-link" to="/login">Login</Link>
            </li>;
        register =
            <li className="nav-item fs-5">
                <Link className="nav-link" to="/register">Register</Link>
            </li>;
    } else {
        logout =
            <li className="nav-item fs-5">
                <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
            </li>
    }

    return (
        <nav
            style={{borderRadius: "0 0 8em 8em"}}
            className="navbar navbar-expand-md bg-primary-subtle py-4 px-5">
            <div className="container-xxl">
                <div className="d-none d-sm-block">
                    <Logo/>
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
                <div id="main-nav" className="collapse navbar-collapse justify-content-end align-center">
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">
                            <Link className="nav-link" to="/">Home</Link>
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
                            <Link className="nav-link" to="/backoffice">Backoffice</Link>
                        </li>
                        {login}
                        {register}
                        {logout}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
