import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import API from "./ApiClient";
import {UserDto} from "./User";
import {useNavigate} from "react-router-dom";

interface LoginState {
    registerEmail: string | undefined,
    registerPassword: string | undefined,
    registerPasswordConfirm: string | undefined,
    registerFullName: string | undefined,
    registerIdNumber: string | undefined,
    registerEmailErrors: string[],
    registerPasswordErrors: string[],
    registerFullNameErrors: string[],
    registerIdNumberErrors: string[],
    registerError: string | undefined,
}

const Login: React.FC = () => {
        const [state, setState] = useState<LoginState>({
            registerEmail: undefined,
            registerPassword: undefined,
            registerPasswordConfirm: undefined,
            registerFullName: undefined,
            registerIdNumber: undefined,
            registerEmailErrors: [],
            registerPasswordErrors: [],
            registerFullNameErrors: [],
            registerIdNumberErrors: [],
            registerError: undefined
        });

        const navigate = useNavigate();

        const handleRegister = (event: FormEvent) => {
            event.preventDefault();
            const {
                emailErrors,
                fullNameErrors,
                idNumberErrors,
                isValid,
                passwordErrors
            } = validateRegisterData();

            if (!isValid) {
                setState({
                    ...state,
                    registerEmailErrors: emailErrors,
                    registerPasswordErrors: passwordErrors,
                    registerFullNameErrors: fullNameErrors,
                    registerIdNumberErrors: idNumberErrors,
                })
                return;
            }

            API.findAll("users")
                .then((x) => {
                    const user = x.find(x => x.email === state.registerEmail);
                    if (user) {
                        throw new Error(`User with email ${state.registerEmail} already exists`);
                    }
                })
                .then(() => {
                    const user: UserDto = {
                        email: state.registerEmail!,
                        password: state.registerEmail!,
                        fullName: state.registerFullName!,
                        idNumber: state.registerIdNumber!,
                    }
                    //ToDo all table names in a single place
                    return API.create("users", user)
                        .then(() => navigate("/login"));
                }).catch(err => {
                setState({
                    ...state,
                    registerError: err.message
                });
            });
        }

        useEffect(() => {
            const {
                passwordErrors,
                emailErrors,
                idNumberErrors,
                fullNameErrors
            } = validateRegisterData();

            setState({
                ...state,
                registerEmailErrors: emailErrors,
                registerPasswordErrors: passwordErrors,
                registerFullNameErrors: fullNameErrors,
                registerIdNumberErrors: idNumberErrors,
            })

        }, [state.registerEmail, state.registerPassword, state.registerPasswordConfirm, state.registerFullName, state.registerIdNumber]);

        function validateRegisterData() {
            let isValid = true;
            const emailErrors: string[] = [];
            if (!state.registerEmail) {
                emailErrors.push("Invalid email address");
                isValid = false;
            }

            const passwordErrors: string[] = [];

            if (state.registerPassword !== state.registerPasswordConfirm) {
                passwordErrors.push("Passwords do not match");
                isValid = false;
            }

            if (!state.registerPassword || state.registerPassword.length < 8) {
                passwordErrors.push("Password must be at least 8 characters");
                isValid = false;
            }

            if (!!state.registerPassword && !state.registerPassword.match(/\d+/g)) {
                passwordErrors.push("Password must contain a number");
                isValid = false;
            }

            if (!!state.registerPassword && state.registerPassword === state.registerPassword.toUpperCase()) {
                passwordErrors.push("The password must contain a lower case character");
                isValid = false;
            }

            if (!!state.registerPassword && state.registerPassword === state.registerPassword.toLowerCase()) {
                passwordErrors.push("The password must contain an upper case character");
                isValid = false;
            }

            if (!!state.registerPassword && !state.registerPassword.match(/[!@#$%^&]/g)) {
                passwordErrors.push("Password must contain !, @, #, $, %, ^ or &");
                isValid = false;
            }

            const fullNameErrors: string[] = [];
            if (!state.registerFullName) {
                fullNameErrors.push("Full name must not be empty");
                isValid = false;
            }

            const idNumberErrors: string[] = [];
            if (!state.registerIdNumber || state.registerIdNumber.length !== 10) {
                idNumberErrors.push("Id number must be 10 symbols");
                isValid = false;
            }

            if (!!state.registerIdNumber && !state.registerIdNumber.match(/\d{10}/g)) {
                idNumberErrors.push("Id number must be only digits");
                isValid = false;
            }

            return {isValid, emailErrors, passwordErrors, fullNameErrors, idNumberErrors};
        }

        const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
            setState(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        }

        return (
            <div className="container-md align-content-center mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4 bg-light-subtle rounded border border-2">
                        <h3 className="h3 text-center my-4">Register</h3>
                        <form>
                            <label htmlFor="register-email" className="form-label">Email: </label>
                            <div className="mb-4 input-group">
                                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                <input type="email" className="form-control" id="register-email"
                                       name="registerEmail"
                                       onChange={handleOnChange}
                                       placeholder="e.g. mario@example.com"/>
                            </div>
                            {state.registerEmailErrors && <ul className="mb-4 text-danger">
                                {state.registerEmailErrors.map(e => <li key={e}>{e}</li>)}
                            </ul>}
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
                            {state.registerPasswordErrors && <ul className="mb-4 text-danger">
                                {state.registerPasswordErrors.map(e => <li key={e}>{e}</li>)}
                            </ul>}
                            <label htmlFor="register-full-name" className="form-label">Full name: </label>
                            <div className="mb-4 input-group">
                                <span className="input-group-text"><i className="bi bi-person"></i></span>
                                <input type="text" className="form-control" id="register-full-name"
                                       name="registerFullName"
                                       onChange={handleOnChange}
                                       placeholder="Mario Galileo"/>
                            </div>
                            {state.registerFullNameErrors && <ul className="mb-4 text-danger">
                                {state.registerFullNameErrors.map(e => <li key={e}>{e}</li>)}
                            </ul>}
                            <label htmlFor="register-id-number" className="form-label">Id number: </label>
                            <div className="mb-4 input-group">
                                <span className="input-group-text"><i className="bi bi-person"></i></span>
                                <input type="text" className="form-control" id="register-id-number"
                                       name="registerIdNumber"
                                       onChange={handleOnChange}
                                       placeholder="7585951025"/>
                            </div>
                            {state.registerIdNumberErrors && <ul className="mb-4 text-danger">
                                {state.registerIdNumberErrors.map(e => <li key={e}>{e}</li>)}
                            </ul>}
                            {state.registerError &&
                                <div className="mb-4 text-danger">{state.registerError}</div>}
                            <div className="mb-4 text-center">
                                <button type="submit" className="btn btn-primary"
                                        onClick={handleRegister}>Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
;

export default Login;