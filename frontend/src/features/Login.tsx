import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

const Login = () => {
    return (
        <div className="container-md align-content-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 bg-light-subtle">
                    <nav>
                        <div className="nav nav-tabs nav-fill" id="nav-tabs" role="tablist">
                            <button className="nav-link active" id="nav-login-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-login"
                                    type="button" role="tab" aria-controls="nav-login" aria-selected="true">Login
                            </button>
                            <button className="nav-link" id="nav-register-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-register"
                                    type="button" role="tab" aria-controls="nav-register"
                                    aria-selected="false">Register
                            </button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active p-3" id="nav-login" role="tabpanel"
                             aria-labelledby="nav-login-tab">
                            <form>
                                <label htmlFor="login-email" className="form-label">Email: </label>
                                <div className="mb-4 input-group">
                                             <span className="input-group-text">
                                                 <i className="bi bi-envelope"></i></span>
                                    <input type="email" className="form-control" id="login-email"
                                           placeholder="e.g. mario@example.com"/>
                                </div>
                                <label htmlFor="login-password" className="form-label">Password: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input type="password" className="form-control" id="login-password"
                                           placeholder="****"/>
                                </div>
                                <div className="mb-4 text-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="tab-pane fade p-3" id="nav-register" role="tabpanel"
                             aria-labelledby="nav-register-tab">
                            <form>
                                <label htmlFor="register-email" className="form-label">Email: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                    <input type="email" className="form-control" id="register-email"
                                           placeholder="e.g. mario@example.com"/>
                                </div>
                                <label htmlFor="register-password" className="form-label">Password: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input type="password" className="form-control" id="register-password"
                                           placeholder="****"/>
                                </div>
                                <label htmlFor="register-password-confirm" className="form-label">Confirm
                                    Password: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input type="password" className="form-control" id="register-password-confirm"
                                           placeholder="****"/>
                                </div>
                                <label htmlFor="register-full-name" className="form-label">Full name: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                                    <input type="text" className="form-control" id="register-full-name"
                                           placeholder="Mario Galileo"/>
                                </div>
                                <label htmlFor="register-id-number" className="form-label">Id number: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                                    <input type="text" className="form-control" id="register-id-number"
                                           placeholder="7585951025"/>
                                </div>
                                <div className="mb-4 text-center">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;