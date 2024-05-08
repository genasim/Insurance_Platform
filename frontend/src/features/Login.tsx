import React, {ChangeEvent, FormEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import API from "./ApiClient";
import {User} from "./User";

interface LoginProps {

}

interface LoginState {
    loginEmail: string | undefined,
    loginPassword: string | undefined,
    registerEmail: string | undefined,
    password: string | undefined,
    confirmPassword: string | undefined,
    fullName: string | undefined,
    idNumber: string | undefined,
}

const Login: React.FC<LoginProps> = () => {
    const [state, setState] = useState<LoginState>({
        loginEmail: undefined,
        loginPassword: undefined,
        registerEmail: undefined,
        password: undefined,
        confirmPassword: undefined,
        fullName: undefined,
        idNumber: undefined,
    });

    const handleLogin = (event: FormEvent) => {
        event.preventDefault();
        if (!state.loginEmail) {
            throw new Error("Invalid username or password");
        }

        API.findByName("users", state.loginEmail)
            .then((x) => {
                const user = x.find(x => x.email === state.loginEmail);
                if (!user) {
                    throw new Error("Invalid username or password");
                }

                return user;
            })
            .then(user => {
                if (user.password !== state.loginPassword) {
                    throw new Error("Invalid username or password");
                }
                debugger;
                sessionStorage.setItem('token', "IM IN");
            }).catch(err => {
            alert(err.message);
        })
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

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
                                    <input type="email" className="form-control" id="login-email" name="loginEmail"
                                           onChange={handleOnChange}
                                           placeholder="e.g. mario@example.com"/>
                                </div>
                                <label htmlFor="login-password" className="form-label">Password: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input type="password" className="form-control" id="login-password"
                                           name="loginPassword"
                                           onChange={handleOnChange}
                                           placeholder="****"/>
                                </div>
                                <div className="mb-4 text-center">
                                    <button type="submit" className="btn btn-primary"
                                            onClick={handleLogin}>Login
                                    </button>
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
                                           name="registerEmail"
                                           onChange={handleOnChange}
                                           placeholder="e.g. mario@example.com"/>
                                </div>
                                <label htmlFor="register-password" className="form-label">Password: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input type="password" className="form-control" id="register-password"
                                           name="registerPassword"
                                           onChange={handleOnChange}
                                           placeholder="****"/>
                                </div>
                                <label htmlFor="register-password-confirm" className="form-label">Confirm
                                    Password: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input type="password" className="form-control" id="register-password-confirm"
                                           name="registerPasswordConfirm"
                                           onChange={handleOnChange}
                                           placeholder="****"/>
                                </div>
                                <label htmlFor="register-full-name" className="form-label">Full name: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                                    <input type="text" className="form-control" id="register-full-name"
                                           name="registerFullName"
                                           onChange={handleOnChange}
                                           placeholder="Mario Galileo"/>
                                </div>
                                <label htmlFor="register-id-number" className="form-label">Id number: </label>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                                    <input type="text" className="form-control" id="register-id-number"
                                           name="registerIdNumber"
                                           onChange={handleOnChange}
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