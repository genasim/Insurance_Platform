/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Currency} from "../../models/Currency";
import {PolicyType} from "../../models/PolicyType";
import moment from "moment";
import API, {Tables} from "../../shared/api-client/ApiClient";
import {PolicyPackage} from "../../models/PolicyPackage";
import {DurationInputArg2} from "moment/moment";
import {CalculationCoefficient} from "../../models/CalculationCoefficient";
import {debug} from "node:util";

interface PolicySubmissionState {
    policyNumber: string,
    holderId: string,
    type: string,
    package: PolicyPackage | null,
    premium: string,
    premiumCurrency: string,
    beginDate: string,
    endDate: string,
    purchaseDate: string,
    packages: PolicyPackage[],
    coefficients: CalculationCoefficient[],
    coefficientValues: any;
}

const PolicySubmission: React.FC = () => {
    const format = "YYYY-MM-DD";

    const [state, setState] = useState<PolicySubmissionState>({
        policyNumber: '',
        holderId: '',
        type: PolicyType.CAR_INSURANCE.toString(),
        package: null,
        premium: '',
        premiumCurrency: Currency.BGN,
        beginDate: moment().format(format),
        endDate: moment().add(1, 'year').format(format),
        purchaseDate: moment().format(format),
        packages: [],
        coefficients: [],
        coefficientValues: {}
    });

    useEffect(() => {
        API.findAll<PolicyPackage>(Tables.POLICY_PACKAGES)
            .then(packages => packages.filter(p => p.policyType.toString() === state.type))
            .then(packages => API.findAll<CalculationCoefficient>(Tables.CALCULATION_COEFFICIENTS)
                .then(coefficients => ({coefficients, packages})))
            .then(dto => {
                    const coefficients = dto.coefficients.filter(x => x.policyType === state.type);
                    setState({
                        ...state,
                        coefficients: coefficients,
                        packages: dto.packages
                    })
                }
            );
    }, [state.type]);

    const handleSubmit = (event: FormEvent) => {
        // event.preventDefault();
        alert("Submit")
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        if (event.target.name === "beginDate") {
            const beginDate = moment(event.target.value);
            const endDate = moment(beginDate).add(state.package?.duration ?? 1, state.package?.durationUnit as DurationInputArg2);
            setState({
                ...state,
                beginDate: beginDate.format(format),
                endDate: endDate.format(format)
            });
            return;
        }

        if (event.target.name === "package") {
            setState({
                ...state,
                package: state.packages.find(x => x.id === event.target.value)!
            });
            return;
        }

        if (event.target.name.startsWith("coefficient_")) {
            const value = event.target.value;
            const currentValues : any = {...state.coefficientValues, [event.target.name.replace("coefficient_", "")]: value};
            setState({
                ...state,
                coefficientValues: currentValues
            });
            return;
        }

        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
        return;
    };

    return (
        <div className="container-md">
            <h2 className="h2 mb-4">Purchase a policy</h2>
            <form>
                <div className="row">
                    <div className="col-md-5 justify-content-center">
                        <label htmlFor="policy-type" className="form-label">Policy type: </label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-braces"></i></span>
                            <select id="policy-type" defaultValue={PolicyType.CAR_INSURANCE} className="form-select"
                                    name="type" onChange={handleOnChange}>
                                {Object.values(PolicyType).map((e, i) => (
                                    <option key={e.toString()} value={e.toString()}>{e.toString()}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-5 justify-content-center">
                        <label htmlFor="package" className="form-label">Package:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-braces"></i></span>
                            <select id="package" className="form-select" name="package" onChange={handleOnChange}>
                                <option disabled selected> -- select an option --</option>
                                {state.packages.map((e, i) => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <h3 className="h3">Package info</h3>
                <div className="row">
                    <div className="col-md-5">
                        <div className="mb-2 d-flex">
                            <span className="d-inline me-2">Package name:</span><span
                            className="fw-bold">{state.package?.name}</span>
                        </div>
                        <div className="mb-2 d-flex">
                            <span className="d-inline me-2">Duration:</span>
                            <span className="fw-bold me-1">{state.package?.duration}</span>
                            <span className="fw-bold">{state.package?.durationUnit}</span>
                        </div>
                        <div className="mb-2 d-flex">
                            <span className="d-inline me-2">Package name:</span><span
                            className="fw-bold">{state.package?.name}</span>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <span className="fw-bold">Coverages:</span>
                        <ul>
                            {state.package?.coverage.map(c => (<li key={c}>{c}</li>))}
                        </ul>
                    </div>
                </div>
                <h3 className="h3">Coefficients</h3>
                {state.coefficients.map(c => {
                    return (<div className="row">
                        <div className="col-md-5">
                            <div className="col-md-5 mb-4 input-group">
                                <span className="input-group-text">{c.description}</span>
                                <select id="policy-type" className="form-select"
                                        name={`coefficient_${c.type}`} onChange={handleOnChange}>
                                    <option disabled selected> -- select an option --</option>
                                    {c.values.map((value, i) => (
                                        <option key={value.name} value={value.value}>{value.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>);
                })}
                <div className="row">
                    <div className="col-md-5 justify-content-center">
                        <label htmlFor="begin-date" className="form-label">Begin date:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-braces"></i></span>
                            <input type="date" className="form-control" id="begin-date" name="beginDate"
                                   min={moment().add(-1, 'day').format(format)}
                                   value={state.beginDate}
                                   onChange={handleOnChange}/>
                        </div>
                    </div>
                    <div className="col-md-5 justify-content-center">
                        <label htmlFor="end-date" className="form-label">End date:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-braces"></i></span>
                            <input type="date" className="form-control" id="end-date" name="endDate"
                                   value={state.endDate}
                                   disabled/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 justify-content-center">
                        <label htmlFor="base-premium" className="form-label">Base Premium:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-braces"></i></span>
                            <input type="number" className="form-control" id="base-premium" name="basePremium"
                                   disabled/>
                        </div>
                    </div>
                    <div className="col-md-5 justify-content-center">
                        <label htmlFor="premium" className="form-label">Premium:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text"><i className="bi bi-braces"></i></span>
                            <input type="number" className="form-control" id="premium" name="premium"
                                   disabled/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 justify-content-center d-flex">
                        <button type="submit" className="btn btn-primary">Purchase</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PolicySubmission;