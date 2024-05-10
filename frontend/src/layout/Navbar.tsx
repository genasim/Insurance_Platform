import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";


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
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>;
        register =
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>;
    } else {
        logout =
            <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
            </li>
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light">
                <div className="container-xxl">
                    <a href="#" className="navbar-brand">
                        <span className="fw-bold text-secondary">
                            <i className="bi bi-car-front mx-2"></i>Safe Insure</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#main-nav"
                            aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="main-nav" className="collapse navbar-collapse justify-content-end align-center">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/policies">Policies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/claims">Claims</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/backoffice">Backoffice</Link>
                            </li>
                            {login}
                            {register}
                            {logout}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;