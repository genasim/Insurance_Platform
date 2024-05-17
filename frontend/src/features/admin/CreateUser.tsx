/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {Right} from "../../models/Rights";
import {validateUser} from "../../shared/user-validation/UserValidationUtil";
import API, {Tables} from "../../shared/api-client/ApiClient";
import {User} from "../../models/User";
import {debug} from "node:util";

interface CreateUserState {
    email: string | undefined,
    password: string | undefined,
    passwordConfirm: string | undefined,
    fullName: string | undefined,
    idNumber: string | undefined,
    rights: Set<Right>,
    emailErrors: string[],
    passwordErrors: string[],
    fullNameErrors: string[],
    idNumberErrors: string[],
    error: string | undefined,
    message: string | undefined,
}

const CreateUser: React.FC = () => {
    const INITIAL_STATE = {
        email: '',
        password: '',
        passwordConfirm: '',
        fullName: '',
        idNumber: '',
        rights: new Set<Right>(),
        emailErrors: [],
        passwordErrors: [],
        fullNameErrors: [],
        idNumberErrors: [],
        error: '',
        message: '',
    };

    const [state, setState] = useState<CreateUserState>(INITIAL_STATE);

    const handleCreateUser = (event: FormEvent) => {
        event.preventDefault();
        debugger;
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
                debugger;
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
                    rights: Array.from(state.rights.values())
                }
                return API.create(Tables.USERS, user);
            })
            .then(x => {
                setState(prevState => ({
                    ...INITIAL_STATE,
                        message: "Created user successfully!"
                }));
            })
            .catch(err => {
            setState({
                ...state,
                error: err.message,
                message: undefined
            });
        });
    }

    const validateRegisterData = useCallback(() => {
        const validationResult = validateUser(state);
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

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name !== "right") {
            setState(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
            return;
        }

        const isValidRight = Object.keys(Right).some(r => r === event.target.value);
        if (!isValidRight) {
            throw new Error("Invalid right type in checkbox")
        }

        const rights: Set<Right> = new Set<Right>(state.rights);
        if (event.target.checked) {
            rights.add(event.target.value as Right);
        } else {
            rights.delete(event.target.value as Right);
        }
        setState(prevState => ({
            ...prevState,
            rights
        }));
    };

    return (
        <div>
            <h2 className="h2 mb-4">Create user</h2>
            <form className="row">
                <div className="col-md-5 justify-content-center">
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
                </div>
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="full-name" className="form-label">Full name: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-person"></i></span>
                        <input type="text" className="form-control" id="full-name"
                               name="fullName"
                               value={state.fullName}
                               onChange={handleOnChange}
                               placeholder="e.g. Todor Georgiev"/>
                    </div>
                    {state.fullNameErrors && <ul className="mb-4 text-danger">
                        {state.fullNameErrors.map(e => <li key={e}>{e}</li>)}
                    </ul>}
                </div>
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="password" className="form-label">Password: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-lock"></i></span>
                        <input type="password" className="form-control" id="password"
                               name="password"
                               value={state.password}
                               onChange={handleOnChange}
                               placeholder="****"/>
                    </div>
                    {state.passwordErrors && <ul className="mb-4 text-danger">
                        {state.passwordErrors.map(e => <li key={e}>{e}</li>)}
                    </ul>}
                </div>
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="confirm-password" className="form-label">Confirm password: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-lock"></i></span>
                        <input type="password" className="form-control" id="confirm-password"
                               name="passwordConfirm"
                               value={state.passwordConfirm}
                               onChange={handleOnChange}
                               placeholder="****"/>
                    </div>
                </div>
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="id-number" className="form-label">Id number: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-person"></i></span>
                        <input type="text" className="form-control" id="id-number"
                               name="idNumber"
                               value={state.idNumber}
                               onChange={handleOnChange}
                               placeholder="e.g. 8211152030"/>
                    </div>
                    {state.idNumberErrors && <ul className="mb-4 text-danger">
                        {state.idNumberErrors.map(e => <li key={e}>{e}</li>)}
                    </ul>}
                </div>
                <div className="col-md-5 mb-4 d-flex justify-content-center">
                    {Object.keys(Right).map(right => (
                        <div key={right} className="form-check align-content-center">
                            <input className="form-check-input" type="checkbox"
                                   id={`checkbox-right-${right}`}
                                   name="right"
                                   value={right}
                                   onChange={handleOnChange}
                            />
                            <label className="form-check-label me-4" htmlFor={`checkbox-right-${right}`}>
                                {right[0] + right.substring(1).toLowerCase()}
                            </label>
                        </div>
                    ))}
                </div>
                {state.error &&
                    <div className="mb-4 text-danger text-center">{state.error}</div>}
                {state.message &&
                    <div className="mb-4 text-success text-center">{state.message}</div>}
                <div className="mb-4 text-center">
                    <button type="submit" className="btn btn-primary" onSubmit={handleCreateUser}>Create user</button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;