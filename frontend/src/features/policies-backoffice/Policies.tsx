import React, {ChangeEvent, useEffect, useState} from 'react';
import {IdType} from "../../models/Identifiable";
import {handleRequest} from "../../shared/BackEndFacade";
import moment from 'moment';

interface PoliciesState {
    policies: PolicyDto[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    numberFilter: string;
    holderFilter: string;
}

interface PolicyDto {
    id: IdType;
    policyNumber: string,
    holderId: string,
    holderName: string,
    type: string,
    packageId: string,
    package: string,
    premium: string,
    premiumCurrency: string
    coverage: string[]
    beginDate: string,
    endDate: string,
    purchaseDate: string,
}

const format = "MM-DD-YYYY";

const Policies: React.FC = () => {
    const [state, setState] = useState<PoliciesState>(
        {
            policies: [],
            pageCount: 1,
            currentPage: 1,
            pageSize: 5,
            numberFilter: '',
            holderFilter: ''
        }
    );

    useEffect(() => {
        const query = `?page=${state.currentPage}&size=${state.pageSize}&number=${state.numberFilter}&holderName=${state.holderFilter}`;
        handleRequest('GET', '/api/backoffice/policies' + query)
            .then(resp => resp.json())
            .then(resp => {
                setState({
                    ...state,
                    policies: resp.policies,
                    pageCount: resp.pageCount,
                });
            })
            .catch(err => {
            });
    }, [state.currentPage, state.numberFilter, state.holderFilter]);

    const handleOnPreviousPageClick = () => {
        if (state.currentPage <= 1) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage - 1,
            policies: []
        })
    };

    const handleSelectedPageClick = (pageNumber: number) => {
        if (pageNumber < 1 || state.pageCount < pageNumber) {
            return;
        }

        setState({
            ...state,
            currentPage: pageNumber
        })
    };

    const handleOnNextPageClick = () => {
        if (state.currentPage >= state.pageCount) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage + 1,
            policies: []
        })
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="container-md">
            <h2>Policies backoffice</h2>
            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by number:</span>
                <input type="text" className="form-control" id="id-number-filter"
                       name="numberFilter"
                       onChange={handleOnChange}
                       placeholder="8804127324"/>
            </div>
            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by holder name:</span>
                <input type="text" className="form-control"
                       name="holderFilter"
                       onChange={handleOnChange}
                       placeholder="George Toshov"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Number</th>
                    <th scope="col">Holder</th>
                    <th scope="col">Package</th>
                    <th scope="col">Begin date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Purchase date</th>
                    <th scope="col">Premium</th>
                    <th scope="col">Coverage</th>
                </tr>
                </thead>
                <tbody>
                {state.policies
                    .map((policy, index) => (
                        <React.Fragment key={policy.id}>
                            <tr>
                                <th scope="row">{(state.currentPage - 1) * state.pageSize + index + 1}</th>
                                <td>{policy.policyNumber}</td>
                                <td>{policy.holderName}</td>
                                <td>{policy.package}</td>
                                <td>{moment(policy.beginDate).format(format)}</td>
                                <td>{moment(policy.endDate).format(format)}</td>
                                <td>{moment(policy.purchaseDate).format(format)}</td>
                                <td>{policy.premium} {policy.premiumCurrency}</td>
                                <td>
                                    {policy.coverage.map(x => <li key={x}>{x}</li>)}
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Manage users pagination" className="navbar justify-content-end">
                <ul className="pagination">
                    <li className="page-item" key={0}><div className="page-link"
                                                         onClick={handleOnPreviousPageClick}>Previous</div></li>
                    {Array.from({length: state.pageCount}, (_, i) => i + 1).map(number =>
                        (<li key={number} className="page-item" onClick={() => handleSelectedPageClick(number)}>
                            <div className="page-link">{number}</div>
                        </li>))
                    }
                    <li className="page-item" key={state.pageCount + 1}><div className="page-link"
                                                                           onClick={handleOnNextPageClick}>Next</div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Policies;