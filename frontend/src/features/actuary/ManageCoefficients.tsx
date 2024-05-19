/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import API, {Tables} from "../../shared/api-client/ApiClient";
import {CalculationCoefficient} from "../../models/CalculationCoefficient";
import {IdType} from "../../models/Identifiable";

interface ManageCoefficientState {
    coefficients: CalculationCoefficient[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    policyTypeFilter: string;
    typeFilter: string;
}

const ManageCoefficients: React.FC = () => {
    const [state, setState] = useState<ManageCoefficientState>(
        {
            coefficients: [],
            pageCount: 1,
            currentPage: 1,
            pageSize: 5,
            policyTypeFilter: '',
            typeFilter: ''
        }
    );

    const navigate = useNavigate();

    useEffect(() => {
        API.findAll<CalculationCoefficient>(Tables.CALCULATION_COEFFICIENTS)
            .then(coefficients => {
                const filteredCoefficients = filterCoefficients(coefficients);
                const pageCount = calculatePageCount(filteredCoefficients);
                setState({
                    ...state,
                    coefficients: filteredCoefficients,
                    pageCount: pageCount,
                    currentPage: state.currentPage <= pageCount ? state.currentPage : 1,
                });
            })
    }, [state.currentPage, state.policyTypeFilter, state.typeFilter]);

    const handleOnPreviousPageClick = () => {
        if (state.currentPage <= 1) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage - 1,
        })
    };

    const handleSelectedPageClick = (pageNumber: number) => {
        if (pageNumber < 1 || state.pageCount < pageNumber) {
            return;
        }

        setState({
            ...state,
            currentPage: pageNumber,
        })
    };

    const handleOnNextPageClick = () => {
        if (state.currentPage >= state.pageCount) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage + 1,
        })
    };

    const handleDelete = (id: IdType) => {
        API.deleteById<CalculationCoefficient>(Tables.CALCULATION_COEFFICIENTS, id)
            .then(_ => setState({
                ...state,
                coefficients: state.coefficients.filter(coefficient => coefficient.id !== id)
            }));
    }

    const calculatePageCount = (coefficients: CalculationCoefficient[]) => {
        const remainingCoefficients = coefficients.length % state.pageSize;
        const remainingPage: number = remainingCoefficients > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(coefficients.length / state.pageSize + remainingPage);
        return pageCount;
    };

    const getBeginIndex = (): number => {
        return (state.currentPage - 1) * state.pageSize;
    }

    const getEndIndex = (): number => {
        return state.currentPage * state.pageSize;
    }

    const filterCoefficients = (coefficients: CalculationCoefficient[]) => {
        if (!!state.typeFilter) {
            coefficients = coefficients.filter((c: CalculationCoefficient) => c.type.includes(state.typeFilter));
        }

        if (!!state.policyTypeFilter) {
            coefficients = coefficients.filter((c: CalculationCoefficient) => c.policyType.includes(state.policyTypeFilter));
        }

        return coefficients;
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="container my-5">
            <div className="d-flex">
            <h2 className="col-md-11 me-4">Manage coefficients</h2>
            <div className="col-md-1">
                <button className="btn btn-primary me-4 mb-4"
                        onClick={() => navigate('/actuary/create-coefficient')}>Create
                </button>
            </div>
            </div>

            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by policy type:</span>
                <input type="text" className="form-control" id="id-number-filter"
                       name="policyTypeFilter"
                       onChange={handleOnChange}
                       placeholder="8804127324"/>
            </div>
            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by type:</span>
                <input type="text" className="form-control" id="email-filter"
                       name="typeFilter"
                       onChange={handleOnChange}
                       placeholder="george@domains.com"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Policy Type</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col">Values</th>
                    <th scope="col">Is enabled</th>
                    <th scope="col" className="text-end">
                        <span className="me-4">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {state.coefficients
                    .filter((_, index) => getBeginIndex() <= index && index < getEndIndex())
                    .map((coefficient, index) => (
                        <React.Fragment key={coefficient.id}>
                            <tr>
                                <th scope="row">{(state.currentPage - 1) * state.pageSize + index + 1}</th>
                                <td>{coefficient.policyType}</td>
                                <td>{coefficient.type}</td>
                                <td>{coefficient.description}</td>
                                <td>{coefficient.values.map(x => <li key={x.name}>{x.name}: {x.value}</li>)}</td>
                                <td>{coefficient.isEnabled ? "ENABLED" : "DISABLED"}</td>
                                <td className="text-end">
                                    <button className="btn btn-primary me-3" onClick={() => {
                                        navigate(`${coefficient.id}`)
                                    }}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger me-3" onClick={() => handleDelete(coefficient.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Manage coefficient pagination" className="navbar justify-content-end">
                <ul className="pagination">
                <li className="page-item" key={0}><a className="page-link"
                                                         onClick={handleOnPreviousPageClick}>Previous</a></li>
                    {Array.from({length: state.pageCount}, (_, i) => i + 1).map(number =>
                        (<li key={number} className="page-item" onClick={() => handleSelectedPageClick(number)}>
                            <a className="page-link">{number}</a>
                        </li>))
                    }
                    <li className="page-item" key={state.pageCount + 1}><a className="page-link"
                                                                           onClick={handleOnNextPageClick}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ManageCoefficients;