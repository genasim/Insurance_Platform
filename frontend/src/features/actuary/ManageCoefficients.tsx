/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {CalculationCoefficient} from "../../models/CalculationCoefficient";
import {IdType} from "../../models/Identifiable";
import {handleRequest} from "../../shared/BackEndFacade";
import toast, {Toaster} from "react-hot-toast";

interface ManageCoefficientState {
    coefficients: CalculationCoefficient[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    policyTypeFilter: string;
    typeFilter: string;
    isDeleted: boolean
}

const ManageCoefficients: React.FC = () => {
    const [state, setState] = useState<ManageCoefficientState>(
        {
            coefficients: [],
            pageCount: 1,
            currentPage: 1,
            pageSize: 5,
            policyTypeFilter: '',
            typeFilter: '',
            isDeleted: false
        }
    );

    const navigate = useNavigate();

    useEffect(() => {
        const query = `?page=${state.currentPage}&size=${state.pageSize}&policyType=${state.policyTypeFilter}&type=${state.typeFilter}`;
        handleRequest('GET', '/api/actuaries/coefficients' + query)
            .then(resp => resp.json())
            .then(resp => {
                setState({
                    ...state,
                    coefficients: resp.coefficients,
                    pageCount: resp.pageCount,
                    isDeleted: false
                });
            })
            .catch(err => {
            });
    }, [state.currentPage, state.policyTypeFilter, state.typeFilter, state.isDeleted]);

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
            coefficients: []
        });
    };

    const handleOnNextPageClick = () => {
        if (state.currentPage >= state.pageCount) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage + 1,
            coefficients: []
        });
    };

    const handleDelete = (id: IdType) => {
        handleRequest('DELETE', '/api/actuaries/coefficients/' + id)
            .then(_ => {
                setState({
                    ...state,
                    isDeleted: true
                });
            })
            .then(_ => toast.success("Deleted coefficient"))
            .catch(err => {
            });
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
                <input type="text" className="form-control"
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
                                    <button className="btn btn-danger me-3"
                                            onClick={() => handleDelete(coefficient.id)}>
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
            <Toaster/>
        </div>
    );
};

export default ManageCoefficients;