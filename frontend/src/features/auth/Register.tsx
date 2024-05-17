/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import API, {Tables} from "../../shared/api-client/ApiClient";
import {Link, useNavigate} from "react-router-dom";
import {Right} from "../../models/Rights";
import {User} from "../../models/User";
import {validateUser} from "../../shared/user-validation/UserValidationUtil";

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
        email: '',
        password: '',
        passwordConfirm: '',
        fullName: '',
        idNumber: '',
        emailErrors: [],
        passwordErrors: [],
        fullNameErrors: [],
        idNumberErrors: [],
        error: ''
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
                const isEmailTaken = x.some(x => x.email === state.email);
                if (isEmailTaken) {
                    throw new Error(`User with email ${state.email} already exists`);
                }

                const isIdNumberTaken = x.some(x => x.idNumber === state.idNumber);
                if (isIdNumberTaken) {
                    throw new Error(`User with id number ${state.idNumber} already exists`);
                }
            })
            .then(() => {
                const user: Omit<User, "id"> = {
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
        const validationResult  = validateUser(state);
        return validationResult;
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

    }, [state.email, state.password, state.passwordConfirm, state.fullName, state.idNumber]);

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
                    <form onSubmit={handleRegister}>
                        <label htmlFor="email" className="form-label">Email: </label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input type="email" className="form-control" id="email"
                                   name="email"
                                   value={state.email}
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
                                   value={state.password}
                                   onChange={handleOnChange}
                                   placeholder="****"/>
                        </div>
                        <label htmlFor="password-confirm" className="form-label">Confirm
                            Password: </label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input type="password" className="form-control" id="password-confirm"
                                   name="passwordConfirm"
                                   value={state.passwordConfirm}
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
                                   value={state.fullName}
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
                                   value={state.idNumber}
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
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;