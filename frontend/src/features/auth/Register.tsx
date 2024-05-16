import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import API, {Tables} from "../../shared/api-client/ApiClient";
import {Link, useNavigate} from "react-router-dom";
import {UserDto} from "./UserDto";
import {Right} from "../../models/Rights";
import {User} from "../../models/User";

interface RegisterState {
    email: string | undefined,
    password: string | undefined,
    passwordConfirm: string | undefined,
    fullName: string | undefined,
    idNumber: string | undefined,
    emailErrors: string[],
    passwordErrors: string[],
    fullNameErrors: string[],
    idNumberErrors: string[],
    error: string | undefined,
}

const Register: React.FC = () => {
    const [state, setState] = useState<RegisterState>({
        email: undefined,
        password: undefined,
        passwordConfirm: undefined,
        fullName: undefined,
        idNumber: undefined,
        emailErrors: [],
        passwordErrors: [],
        fullNameErrors: [],
        idNumberErrors: [],
        error: undefined
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
                emailErrors: emailErrors,
                passwordErrors: passwordErrors,
                fullNameErrors: fullNameErrors,
                idNumberErrors: idNumberErrors,
            })
            return;
        }

        API.findAll<User>(Tables.USERS)
            .then((x) => {
                const user = x.find(x => x.email === state.email);
                if (user) {
                    throw new Error(`User with email ${state.email} already exists`);
                }
            })
            .then(() => {
                const user: UserDto = {
                    email: state.email!,
                    password: state.password!,
                    fullName: state.fullName!,
                    idNumber: state.idNumber!,
                    rights: [Right.CLIENT]
                }
                return API.create(Tables.USERS, user)
                    .then(() => navigate("/login"));
            }).catch(err => {
            setState({
                ...state,
                error: err.message
            });
        });
    }

    const validateRegisterData = useCallback(() => {
        let isValid = true;
        const emailErrors: string[] = [];
        if (!state.email || !state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            emailErrors.push("Invalid email address");
            isValid = false;
        }

        const passwordErrors: string[] = [];

        if (state.password !== state.passwordConfirm) {
            passwordErrors.push("Passwords do not match");
            isValid = false;
        }

        if (!state.password || state.password.length < 8) {
            passwordErrors.push("Password must be at least 8 characters");
            isValid = false;
        }

        if (!!state.password && !state.password.match(/\d+/g)) {
            passwordErrors.push("Password must contain a number");
            isValid = false;
        }

        if (!!state.password && state.password === state.password.toUpperCase()) {
            passwordErrors.push("The password must contain a lower case character");
            isValid = false;
        }

        if (!!state.password && state.password === state.password.toLowerCase()) {
            passwordErrors.push("The password must contain an upper case character");
            isValid = false;
        }

        if (!!state.password && !state.password.match(/[!@#$%^&]/g)) {
            passwordErrors.push("Password must contain !, @, #, $, %, ^ or &");
            isValid = false;
        }

        const fullNameErrors: string[] = [];
        if (!state.fullName) {
            fullNameErrors.push("Full name must not be empty");
            isValid = false;
        }

        const idNumberErrors: string[] = [];
        if (!state.idNumber || state.idNumber.length !== 10) {
            idNumberErrors.push("Id number must be 10 symbols");
            isValid = false;
        }

        if (!!state.idNumber && !state.idNumber.match(/\d{10}/g)) {
            idNumberErrors.push("Id number must be only digits");
            isValid = false;
        }

        return {isValid, emailErrors, passwordErrors, fullNameErrors, idNumberErrors};
    }, [state.email, state.fullName, state.idNumber, state.password, state.passwordConfirm])


    useEffect(() => {
        const {
            passwordErrors,
            emailErrors,
            idNumberErrors,
            fullNameErrors
        } = validateRegisterData();

        setState({
            ...state,
            emailErrors: emailErrors,
            passwordErrors: passwordErrors,
            fullNameErrors: fullNameErrors,
            idNumberErrors: idNumberErrors,
        })

    }, [state.email, state.password, state.passwordConfirm, state.fullName, state.idNumber, validateRegisterData, state]);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="container-md align-content-center my-5">
            <div className="row justify-content-center">
                <div className="col-md-4 bg-light-subtle rounded border border-2">
                    <h4 className="h4 text-center my-4">Register an account with us!</h4>
                    <form>
                        <label htmlFor="email" className="form-label">Email: </label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input type="email" className="form-control" id="email"
                                   name="email"
                                   onChange={handleOnChange}
                                   placeholder="e.g. mario@example.com"/>
                        </div>
                        {state.emailErrors && <ul className="mb-4 text-danger">
                            {state.emailErrors.map(e => <li key={e}>{e}</li>)}
                        </ul>}
                        <label htmlFor="password" className="form-label">Password: </label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input type="password" className="form-control" id="password"
                                   name="password"
                                   onChange={handleOnChange}
                                   placeholder="****"/>
                        </div>
                        <label htmlFor="password-confirm" className="form-label">Confirm
                            Password: </label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input type="password" className="form-control" id="password-confirm"
                                   name="passwordConfirm"
                                   onChange={handleOnChange}
                                   placeholder="****"/>
                        </div>
                        {state.passwordErrors && <ul className="mb-4 text-danger">
                            {state.passwordErrors.map(e => <li key={e}>{e}</li>)}
                        </ul>}
                        <label htmlFor="full-name" className="form-label">Full name: </label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-person"></i></span>
                            <input type="text" className="form-control" id="full-name"
                                   name="fullName"
                                   onChange={handleOnChange}
                                   placeholder="Mario Galileo"/>
                        </div>
                        {state.fullNameErrors && <ul className="mb-4 text-danger">
                            {state.fullNameErrors.map(e => <li key={e}>{e}</li>)}
                        </ul>}
                        <label htmlFor="id-number" className="form-label">Id number: </label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-person"></i></span>
                            <input type="text" className="form-control" id="id-number"
                                   name="idNumber"
                                   onChange={handleOnChange}
                                   placeholder="7585951025"/>
                        </div>
                        {state.idNumberErrors && <ul className="mb-4 text-danger">
                            {state.idNumberErrors.map(e => <li key={e}>{e}</li>)}
                        </ul>}
                        {state.error &&
                            <div className="mb-4 text-danger">{state.error}</div>}
                        <Link to="/login" className="text-center d-block text-decoration-none mb-4">Already have an
                            account? Login now!</Link>
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
};

export default Register;