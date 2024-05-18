/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import API, {Tables} from "../../shared/api-client/ApiClient";
import {IdType} from "../../models/Identifiable";
import {PolicyType} from "../../models/PolicyType";
import {CalculationCoefficientValue} from "../../models/CalculationCoefficientValue";
import {CalculationCoefficient} from "../../models/CalculationCoefficient";

interface CoefficientUpdateState {
    policyType: PolicyType,
    type: string,
    description: string,
    values: CalculationCoefficientValue[],
    isEnabled: boolean,
    coefficientName: string,
    coefficientValue: number,
    error: string,
    message: string,
}

const UpdateCoefficient: React.FC = () => {
    const {coefficientId} = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState<CoefficientUpdateState>({
        policyType: PolicyType.CAR_INSURANCE,
        type: '',
        description: '',
        values: [],
        isEnabled: true,
        coefficientName: '',
        coefficientValue: 0,
        error: '',
        message: ''
    });

    const handleUserUpdate = (event: FormEvent) => {
        //     event.preventDefault();
        //     const {
        //         emailErrors,
        //         fullNameErrors,
        //         isValid,
        //     } = validateUser();
        //
        //     if (!isValid) {
        //         setState({
        //             ...state,
        //             emailErrors: emailErrors,
        //             fullNameErrors: fullNameErrors,
        //         })
        //         return;
        //     }
        //
        //     API.findById<User>(Tables.USERS, coefficientId as IdType)
        //         .then(user => {
        //             user.email = state.email;
        //             user.fullName = state.fullName;
        //             user.rights = Array.from(state.rights);
        //             return API.update<User>(Tables.USERS, user);
        //         })
        //         .then(_ => {
        //             setState({
        //                 ...state,
        //                 message: "Successfully updated user!"
        //             });
        //         })
        //         .catch(err => {
        //             setState({
        //                 ...state,
        //                 error: err.message,
        //             });
        //         });
    };
    //
    // const [state, setState] = useState<CoefficientUpdateState>({
    //     email: '',
    //     password: '',
    //     passwordConfirm: '',
    //     fullName: '',
    //     idNumber: '',
    //     rights: new Set<Right>(Array.from([Right.CLIENT])),
    //     isEdited: false,
    //     emailErrors: [],
    //     fullNameErrors: [],
    //     error: '',
    //     message: '',
    // });

    const handleCoefficientDelete = (name: string) => {
        setState({
            ...state,
            values: state.values.filter(v => v.name !== name),
        });
    }

    const handleAddCoefficientValue = (event: React.MouseEvent<HTMLDivElement>) => {
        if(!state.coefficientName || !state.coefficientValue) {
            return;
        }

        const updatedValues = Array.from(state.values);
        updatedValues.push({name: state.coefficientName, value: state.coefficientValue})
        setState({
            ...state,
            values: updatedValues,
        });
    }

    useEffect(() => {
        API.findById<CalculationCoefficient>(Tables.CALCULATION_COEFFICIENTS, coefficientId as IdType)
            .then(coefficient => {
                setState({
                    ...state,
                    policyType: coefficient.policyType,
                    type: coefficient.type,
                    description: coefficient.description,
                    values: coefficient.values,
                    isEnabled: coefficient.isEnabled,
                });
            })
            .catch(err => {
                setState({
                    ...state,
                    error: err.message,
                });
            });
    }, []);

    // const validateUser = () => {
    //     let isValid = true;
    //     const emailErrors: string[] = [];
    //     if (!state.email || !state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    //         emailErrors.push("Invalid email address");
    //         isValid = false;
    //     }
    //
    //     const fullNameErrors: string[] = [];
    //     if (!state.fullName) {
    //         fullNameErrors.push("Full name must not be empty");
    //         isValid = false;
    //     }
    //
    //     return {isValid, emailErrors, fullNameErrors};
    // }
    //
    // useEffect(() => {
    //     const {
    //         emailErrors,
    //         fullNameErrors
    //     } = validateUser();
    //
    //     setState({
    //         ...state,
    //         emailErrors: emailErrors,
    //         fullNameErrors: fullNameErrors,
    //     })
    //
    // }, [state.email, state.fullName]);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        let value: any = event.target.value;
        if (event.target.name === "isEnabled") {
            value = value === "true";
        }

        if (event.target.name === "coefficientValue") {
            value = parseFloat(value);
        }

        setState(prevState => ({
            ...prevState,
            isEdited: true,
            message: '',
            [event.target.name]: value
        }));
    };
    //ToDo why some form post to the url react
    return (
        <div className="container my-5">
            <button className="btn btn-secondary d-inline me-4 mb-4" onClick={() => navigate(-1)}>Back</button>
            <h2 className="h2 mb-4 d-inline">Update coefficient</h2>
            <form className="row" onSubmit={handleUserUpdate}>
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="policy-type" className="form-label">Policy type: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-braces"></i></span>
                        <input type="text" className="form-control" id="policy-type"
                               name="policyType"
                               value={state.policyType}
                               onChange={handleOnChange}
                               placeholder="CAR_INSURANCE"/>
                    </div>
                </div>
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="type" className="form-label">Type: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-braces"></i></span>
                        <input type="text" className="form-control" id="type"
                               name="type"
                               value={state.type}
                               onChange={handleOnChange}
                               placeholder="AGE"/>
                    </div>
                </div>
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="description" className="form-label">Description: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-braces"></i></span>
                        <input type="text" className="form-control" id="description"
                               name="description"
                               value={state.description}
                               onChange={handleOnChange}
                               placeholder="Description"/>
                    </div>
                </div>
                <div className="col-md-5 mb-4 d-flex justify-content-center">
                    {state.values.map(coefficient => (
                        <div key={coefficient.name} className="form-check border rounded me-3 align-content-center">
                            <span className="me-4">{coefficient.name}</span><span
                            className="me-3">{coefficient.value.toFixed(2)}</span>
                            <button className="btn btn-danger my-2 me-2 d-inline"
                                    onClick={() => handleCoefficientDelete(coefficient.name)}>Delete
                            </button>
                        </div>
                    ))}
                </div>
                <div className="col-md-5 mb-4 d-flex justify-content-center">
                    <input className="form-check-input me-2" type="checkbox"
                           id="is-enabled"
                           name="isEnabled"
                           value={state.isEnabled.toString()}
                           onChange={handleOnChange}
                    />
                    <label className="form-check-label me-4" htmlFor="is-enabled">Is enabled</label>
                </div>

                {/*{state.error &&*/}
                {/*    <div className="mb-4 text-danger text-center">{state.error}</div>}*/}
                {/*{state.message &&*/}
                {/*    <div className="mb-4 text-success text-center">{state.message}</div>}*/}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Update coefficient</button>
                </div>
            </form>
            <div className="col-md-3">
                <label htmlFor="coefficient-name" className="form-label">Coefficient name:</label>
                <input type="text" className="form-control mb-2" id="coefficient-name"
                       name="coefficientName"
                       value={state.coefficientName}
                       onChange={handleOnChange}
                       placeholder="name"/>
            </div>
            <div className="col-md-3">
                <label htmlFor="coefficient-value" className="form-label">Coefficient value:</label>
                <input type="number" className="form-control mb-4" id="coefficient-value"
                       name="coefficientValue"
                       value={state.coefficientValue}
                       onChange={handleOnChange}
                       placeholder="value"/>
            </div>
            <div className="col-md-3 justify-content-center text-center">
                <div className="btn btn-primary" onClick={(event) => handleAddCoefficientValue(event)}>
                    Add Coefficient value
                </div>
            </div>
        </div>
    );
};

export default UpdateCoefficient;