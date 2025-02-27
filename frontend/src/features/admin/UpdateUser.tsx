/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Right} from "../../models/Rights";
import {handleRequest} from "../../shared/BackEndFacade";
import toast, {Toaster} from "react-hot-toast";

interface UserUpdateState {
    email: string,
    fullName: string,
    idNumber: string,
    rights: Set<Right>,
    isEdited: boolean,
    emailErrors: string[],
    fullNameErrors: string[],
}

const UpdateUser: React.FC = () => {
    const {userId} = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState<UserUpdateState>({
        email: '',
        fullName: '',
        idNumber: '',
        rights: new Set<Right>(Array.from([Right.CLIENT])),
        isEdited: false,
        emailErrors: [],
        fullNameErrors: [],
    });

    const handleUserUpdate = (event: FormEvent) => {
        event.preventDefault();
        const {
            emailErrors,
            fullNameErrors,
            isValid,
        } = validateUser();

        if (!isValid) {
            setState({
                ...state,
                emailErrors: emailErrors,
                fullNameErrors: fullNameErrors,
            })
            return;
        }

        const updatedUserInfo = {
            email: state.email,
            fullName: state.fullName,
            rights: Array.from(state.rights)
        };

        handleRequest("PATCH", `/api/admin/users/${userId}`, updatedUserInfo)
            .then(_ => toast.success("Successfully updated user!"))
            .catch(_ => {});
    };

    useEffect(() => {
        handleRequest("GET", `/api/admin/users/${userId}`)
            .then(resp => resp.json())
            .then(resp => {
                setState({
                    ...state,
                    email: resp.email,
                    fullName: resp.fullName,
                    idNumber: resp.idNumber,
                    rights: new Set<Right>(Array.from(resp.rights)),
                })
            })
            .catch(_ => {});
    }, []);

    const validateUser = () => {
        let isValid = true;
        const emailErrors: string[] = [];
        if (!state.email || !state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            emailErrors.push("Invalid email address");
            isValid = false;
        }

        const fullNameErrors: string[] = [];
        if (!state.fullName) {
            fullNameErrors.push("Full name must not be empty");
            isValid = false;
        }

        return {isValid, emailErrors, fullNameErrors};
    }

    useEffect(() => {
        const {
            emailErrors,
            fullNameErrors
        } = validateUser();

        setState({
            ...state,
            emailErrors: emailErrors,
            fullNameErrors: fullNameErrors,
        })

    }, [state.email, state.fullName]);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name !== "right") {
            setState(prevState => ({
                ...prevState,
                isEdited: true,
                message: '',
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
            isEdited: true,
            message: '',
            rights
        }));
    };

    return (
        <div className="container my-5">
                <button className="btn btn-secondary d-inline me-4 mb-4" onClick={() => navigate(-1)}>Back</button>
                <h2 className="h2 mb-4 d-inline">Update user</h2>
            <form className="row" onSubmit={handleUserUpdate}>
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
                    <label htmlFor="id-number" className="form-label">Id number: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-person"></i></span>
                        <input type="text" className="form-control" id="id-number"
                               name="idNumber"
                               value={state.idNumber}
                               disabled
                               placeholder="e.g. 8211152030"/>
                    </div>
                </div>
                <div className="col-md-5 mb-4 d-flex justify-content-center">
                    {Object.values(Right).map(right => (
                        <div key={right} className="form-check align-content-center">
                            <input className="form-check-input" type="checkbox"
                                   id={`checkbox-right-${right}`}
                                   name="right"
                                   value={right}
                                   checked={Array.from(state.rights).some(x => x.toString() === right)}
                                   onChange={handleOnChange}
                            />
                            <label className="form-check-label me-4" htmlFor={`checkbox-right-${right}`}>
                                {right[0] + right.substring(1).toLowerCase()}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mb-4 text-center">
                    <button type="submit" className="btn btn-primary">Update user</button>
                </div>
            </form>
            <Toaster/>
        </div>
    );
};

export default UpdateUser;