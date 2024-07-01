/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {PolicyType} from "../../models/PolicyType";
import {CalculationCoefficientValue} from "../../models/CalculationCoefficientValue";
import {CalculationCoefficient} from "../../models/CalculationCoefficient";
import {handleRequest} from "../../shared/BackEndFacade";
import toast, {Toaster} from "react-hot-toast";

interface CoefficientCreateState {
    policyType: PolicyType,
    type: string,
    description: string,
    values: CalculationCoefficientValue[],
    isEnabled: boolean,
    coefficientName: string,
    coefficientValue: number,
    isEdited: boolean,
    typeErrors: string[],
    descriptionErrors: string[],
    coefficientErrors: string[],
}

const CreateCoefficient: React.FC = () => {
    const navigate = useNavigate();
    const [state, setState] = useState<CoefficientCreateState>({
        policyType: PolicyType.CAR_INSURANCE,
        type: '',
        description: '',
        values: [],
        isEnabled: true,
        coefficientName: '',
        coefficientValue: 0,
        isEdited: false,
        typeErrors: [],
        descriptionErrors: [],
        coefficientErrors: [],
    });

    const handleCoefficientCreate = (event: FormEvent) => {
        event.preventDefault();
        const {
            typeErrors,
            descriptionErrors,
            isValid,
        } = validateCoefficient();

        if (!isValid) {
            setState({
                ...state,
                typeErrors: typeErrors,
                descriptionErrors: descriptionErrors,
            })
            return;
        }

        const coefficientEntity: Omit<CalculationCoefficient, "id"> = {
            policyType: state.policyType,
            type: state.type,
            description: state.description,
            values: state.values,
            isEnabled: state.isEnabled,
        };

        handleRequest('POST', '/api/actuaries/coefficients/', coefficientEntity)
            .then(_ => {
                toast.success("Successfully created coefficient!");
            })
            .then(_ => {
                setState({
                    ...state,
                    policyType: PolicyType.CAR_INSURANCE,
                    type: '',
                    description: '',
                    values: [],
                    isEnabled: true,
                })
            })
            .catch(_ => {
            });
    };

    const handleCoefficientDelete = (name: string) => {
        setState({
            ...state,
            values: state.values.filter(v => v.name !== name),
        });
    }

    const handleAddCoefficientValue = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!state.coefficientName || !state.coefficientValue) {
            setState({
                ...state,
                coefficientErrors: ["Value or name is empty"],
            });
            return;
        }

        if (state.values.map(x => x.name).some(presentName => presentName === state.coefficientName)) {
            setState({
                ...state,
                coefficientErrors: ["Coefficient already exists"],
            });
            return;
        }

        const updatedValues = Array.from(state.values);
        updatedValues.push({name: state.coefficientName, value: state.coefficientValue})
        setState({
            ...state,
            coefficientName: '',
            coefficientValue: 0,
            coefficientErrors: [],
            values: updatedValues,
        });
    }

    const validateCoefficient = () => {
        let isValid = true;
        const typeErrors: string[] = [];
        if (!state.type) {
            typeErrors.push("Invalid type");
            isValid = false;
        }

        const descriptionErrors: string[] = [];
        if (!state.description) {
            descriptionErrors.push("Invalid description");
            isValid = false;
        }

        return {isValid, typeErrors, descriptionErrors};
    }

    useEffect(() => {
        const {
            typeErrors,
            descriptionErrors
        } = validateCoefficient();

        setState({
            ...state,
            typeErrors: typeErrors,
            descriptionErrors: descriptionErrors,
        })

    }, [state.type, state.description]);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        let value: any = event.target.value;
        if (event.target.name === "isEnabled") {
            value = (event.target as HTMLInputElement).checked;
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

    return (
        <div className="container my-5">
            <button className="btn btn-secondary d-inline me-4 mb-4" onClick={() => navigate('/actuary')}>Back</button>
            <h2 className="h2 mb-4 d-inline">Create coefficient</h2>
            <form className="row" onSubmit={handleCoefficientCreate}>
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="policy-type" className="form-label">Policy type: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-braces"></i></span>
                        <select id="policy-type" defaultValue={PolicyType.CAR_INSURANCE} className="form-select"
                                name="policyType" onChange={handleOnChange}>
                            {Object.values(PolicyType).map((e, i) => (
                                <option key={e.toString()} value={e.toString()}>{e.toString()}</option>
                            ))}
                        </select>
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
                    {state.isEdited && state.typeErrors && <ul className="mb-4 text-danger">
                        {state.typeErrors.map(e => <li key={e}>{e}</li>)}
                    </ul>}
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
                    {state.isEdited && state.descriptionErrors && <ul className="mb-4 text-danger">
                        {state.descriptionErrors.map(e => <li key={e}>{e}</li>)}
                    </ul>}
                </div>
                <div className="col-md-6 mb-4 align-content-center text-center">
                    <input className="form-check-input me-2" type="checkbox"
                           id="is-enabled"
                           name="isEnabled"
                           checked={state.isEnabled}
                           onChange={handleOnChange}
                    />
                    <label className="form-check-label me-4" htmlFor="is-enabled">Is enabled</label>
                </div>
                <div className="col-md-10 mb-4 d-flex justify-content-center">
                    {state.values.map(coefficient => (
                        <div key={coefficient.name} className="form-check border rounded me-3 align-content-center">
                            <span className="me-3">{coefficient.name}</span>
                            <span className="me-4">{coefficient.value.toFixed(2)}</span>
                            <button className="btn btn-danger my-2 me-2 d-inline"
                                    onClick={() => handleCoefficientDelete(coefficient.name)}>Delete
                            </button>
                        </div>
                    ))}
                </div>
                <div className="row">
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
                    <div className="col-md-3 align-content-center">
                        <button type="button" className="btn btn-primary" onClick={handleAddCoefficientValue}>
                            Add Coefficient value
                        </button>
                    </div>
                </div>
                {state.isEdited && state.coefficientErrors && <ul className="mb-4 text-danger">
                    {state.coefficientErrors.map(e => <li key={e}>{e}</li>)}
                </ul>}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Create coefficient</button>
                </div>
            </form>
            <Toaster/>
        </div>
    );
};

export default CreateCoefficient;