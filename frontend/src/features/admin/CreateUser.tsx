/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {Right} from "../../models/Rights";
import {validateUser} from "../../shared/user-validation/UserValidationUtil";
import {User} from "../../models/User";
import {handleRequest} from "../../shared/BackEndFacade";
import {Toaster} from "react-hot-toast";

interface UserCreateState {
    email: string,
    password: string,
    passwordConfirm: string,
    fullName: string,
    idNumber: string,
    rights: Set<Right>,
    isEdited: boolean,
    emailErrors: string[],
    passwordErrors: string[],
    fullNameErrors: string[],
    idNumberErrors: string[]
}

const CreateUser: React.FC = () => {
    const INITIAL_STATE = {
        email: '',
        password: '',
        passwordConfirm: '',
        fullName: '',
        idNumber: '',
        rights: new Set<Right>(),
        isEdited: false,
        emailErrors: [],
        passwordErrors: [],
        fullNameErrors: [],
        idNumberErrors: []
    };

    const [state, setState] = useState<UserCreateState>(INITIAL_STATE);

    const handleCreateUser = (event: FormEvent) => {
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

        const user: Omit<User, "id"> = {
            email: state.email!,
            password: state.password!,
            fullName: state.fullName!,
            idNumber: state.idNumber!,
            rights: Array.from(state.rights.values())
        }

        handleRequest('POST', '/api/admin/users/', user)
            .then(_ => {
                setState({...INITIAL_STATE});
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
                isEdited: true,
                [event.target.name]: event.target.value
            }));
            return;
        }

        const isValidRight = Object.values(Right).some(r => r === event.target.value);
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
            isEdited: true,
            rights
        }));
    };

    return (
        <div>
            <h2 className="h2 mb-4">Create user</h2>
            <form className="row" onSubmit={handleCreateUser}>
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
                    {state.isEdited && state.emailErrors && <ul className="mb-4 text-danger">
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
                    {state.isEdited && state.fullNameErrors && <ul className="mb-4 text-danger">
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
                    {state.isEdited && state.passwordErrors && <ul className="mb-4 text-danger">
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
                    {state.isEdited && state.idNumberErrors && <ul className="mb-4 text-danger">
                        {state.idNumberErrors.map(e => <li key={e}>{e}</li>)}
                    </ul>}
                </div>
                <div className="col-md-5 mb-4 d-flex justify-content-center">
                    {Object.values(Right).map(right => (
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
                <div className="mb-4 text-center">
                    <button type="submit" className="btn btn-primary">Create user</button>
                </div>
            </form>
            <Toaster/>
        </div>
    );
};

export default CreateUser;