import React, {ChangeEvent, useEffect, useState} from 'react';
import {Policy} from "../../models/Policy";
import {useNavigate} from "react-router-dom";
import API, {Tables} from "../../shared/api-client/ApiClient";
import {IdType} from "../../models/Identifiable";
import {User} from "../../models/User";
import {PolicyPackage} from "../../models/PolicyPackage";

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

const ClaimPayments: React.FC = () => {
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
        API.findAll<Policy>(Tables.POLICIES)
            .then(policies => {
                return API.findAll<User>(Tables.USERS).then(users => ({
                    users,
                    policies
                }))
            })
            .then(dto => {
                return API.findAll<PolicyPackage>(Tables.POLICY_PACKAGES)
                    .then(packages => ({
                    ...dto,
                    packages
                }))
            })
            .then(dto => {
                const policyDTOs = dto.policies.map(p => {
                    const user = dto.users.find(u => u.id === p.holderId)!;
                    const policyPackage = dto.packages.find(pack =>  pack.id === p.packageId)!;

                    const policyDTO: PolicyDto = {
                        ...p,
                        holderName: user.fullName,
                        package: policyPackage.name,
                        coverage: policyPackage.coverage
                    }
                    return policyDTO;
                });
                const filteredPolicies = filterPolicies(policyDTOs);
                const pageCount = calculatePageCount(filteredPolicies);
                setState({
                    ...state,
                    policies: filteredPolicies,
                    pageCount: pageCount,
                    currentPage: state.currentPage <= pageCount ? state.currentPage : 1,
                });
            })
    }, [state.currentPage, state.numberFilter, state.holderFilter]);

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

    const calculatePageCount = (policies: Policy[]) => {
        const remainingUsers = policies.length % state.pageSize;
        const remainingPage: number = remainingUsers > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(policies.length / state.pageSize + remainingPage);
        return pageCount;
    };

    const getBeginIndex = (): number => {
        return (state.currentPage - 1) * state.pageSize;
    }

    const getEndIndex = (): number => {
        return state.currentPage * state.pageSize;
    }

    const filterPolicies = (policies: PolicyDto[]) => {
        if (!!state.numberFilter) {
            policies = policies.filter((p: PolicyDto) => p.policyNumber.includes(state.numberFilter));
        }

        if (!!state.holderFilter) {
            policies = policies.filter((p: PolicyDto) => p.holderName.includes(state.holderFilter));
        }

        return policies;
    }

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
                <input type="text" className="form-control" id="email-filter"
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
                    .filter((_, index) => getBeginIndex() <= index && index < getEndIndex())
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

export default ClaimPayments;