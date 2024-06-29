import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {IdType} from "../../models/Identifiable";
import {handleRequest} from "../../shared/BackEndFacade";

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

    const navigate = useNavigate();

    useEffect(() => {
        const query = `?page=${state.currentPage}&size=${state.pageSize}&number=${state.numberFilter}&holderName=${state.holderFilter}`;
        handleRequest('GET', '/api/backoffice/policies' + query)
            .then(resp => resp.json())
            .then(resp => {
                const policyDtos: PolicyDto[] = resp.policies.map((p: any) => ({
                    id: p._id,
                    policyNumber: p.policyNumber,
                    holderId: p.holderId,
                    holderName: p.holder[0]?.fullName ?? "",
                    type: p.type,
                    packageId: p.packageId,
                    package: p.package[0]?.name ?? "",
                    premium: p.premium,
                    premiumCurrency: p.premiumCurrency,
                    coverage: p.package[0]?.coverage ?? [],
                    beginDate: p.beginDate,
                    endDate: p.endDate,
                    purchaseDate: p.purchaseDate
                }));
                setState({
                    ...state,
                    policies: policyDtos,
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
                                <td>{policy.beginDate}</td>
                                <td>{policy.endDate}</td>
                                <td>{policy.purchaseDate}</td>
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

export default Policies;