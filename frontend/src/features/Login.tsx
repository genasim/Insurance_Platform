import React, {ChangeEvent, FormEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import API, {Tables} from "../shared/api-client/ApiClient";
import {Link, useNavigate} from "react-router-dom";

interface LoginState {
    email: string | undefined,
    password: string | undefined,
    error: string | undefined,

}

const Login: React.FC = () => {
    const [state, setState] = useState<LoginState>({
        email: undefined,
        password: undefined,
        error: undefined,
    });

    const navigate = useNavigate();

    const handleLogin = (event: FormEvent) => {
        event.preventDefault();
        if (!state.email || !state.password) {
            setState({
                ...state,
                error: "No email or password entered"
            });
            return;
        }

        API.findAll(Tables.USERS)
            .then(x => {
                const user = x.find(x => x.email === state.email);
                if (!user) {
                    throw new Error("Invalid username or password");
                }

                if (user.password !== state.password) {
                    throw new Error("Invalid username or password");
                }

                sessionStorage.setItem('token', "IM IN");
                navigate("/home");
            }).catch(_ => {
            setState({
                ...state,
                error: "Invalid username or password"
            });
        });
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="container-md align-content-center my-5">
            <div style={{height: "5vh"}}></div>
            <div className="row justify-content-center">
                <div className="col-md-4 bg-light-subtle rounded border border-2">
                    <h3 className="h3 text-center my-4">Login</h3>
                    <form className="px-3">
                        <label htmlFor="login-email" className="form-label">Email: </label>
                        <div className="mb-4 input-group">
                                             <span className="input-group-text">
                                                 <i className="bi bi-envelope"></i></span>
                            <input type="email" className="form-control" id="login-email" name="email"
                                   onChange={handleOnChange}
                                   placeholder="e.g. mario@example.com"/>
                        </div>
                        <label htmlFor="login-password" className="form-label">Password: </label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input type="password" className="form-control" id="login-password"
                                   name="password"
                                   onChange={handleOnChange}
                                   placeholder="****"/>
                        </div>
                        {state.error &&
                            <div className="mb-4 text-center text-danger">{state.error}</div>}
                        <Link to="/register" className="text-center d-block text-decoration-none mb-4">Dont have an
                            account? Register now!</Link>
                        <div className="mb-4 text-center">
                            <button type="submit" className="btn btn-primary"
                                    onClick={handleLogin}>Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;