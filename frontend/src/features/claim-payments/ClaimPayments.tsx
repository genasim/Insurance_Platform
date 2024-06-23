import React, {ChangeEvent, useEffect, useState} from 'react';
import API, {Tables} from "../../shared/api-client/ApiClient";
import {ClaimPayment} from "../../models/ClaimPayment";
import {Claim} from "../../models/Claim";
import {IdType} from "../../models/Identifiable";
import {Currency} from "../../models/Currency";

interface PaymentsState {
    payments: ClaimPaymentDto[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    numberFilter: string;
}

interface ClaimPaymentDto {
    id: IdType,
    claimId: IdType,
    claimNumber: string,
    amount: number,
    amountCurrency: Currency,
    paymentDate: Date
}

const ClaimPayments: React.FC = () => {
    const [state, setState] = useState<PaymentsState>(
        {
            payments: [],
            pageCount: 1,
            currentPage: 1,
            pageSize: 5,
            numberFilter: '',
        }
    );

    useEffect(() => {
        API.findAll<ClaimPayment>(Tables.CLAIM_PAYMENTS)
            .then(payments =>
                API.findAll<Claim>(Tables.CLAIMS)
                    .then(claims => payments.map(p => {
                        const claim = claims.find(c => c.id === p.claimId);
                        return {
                            claimId: p.claimId,
                            claimNumber: claim?.claimNumber ?? "",
                            amount: p.amount,
                            amountCurrency: p.amountCurrency,
                            paymentDate: p.paymentDate
                        } as ClaimPaymentDto;
                    }))
            )
            .then(payments => {

                const filteredPolicies = filterPayments(payments);
                const pageCount = calculatePageCount(filteredPolicies);
                setState({
                    ...state,
                    payments: filteredPolicies,
                    pageCount: pageCount,
                    currentPage: state.currentPage <= pageCount ? state.currentPage : 1,
                });
            })
    }, [state.currentPage, state.numberFilter]);

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

    const calculatePageCount = (payments: ClaimPaymentDto[]) => {
        const remainingUsers = payments.length % state.pageSize;
        const remainingPage: number = remainingUsers > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(payments.length / state.pageSize + remainingPage);
        return pageCount;
    };

    const getBeginIndex = (): number => {
        return (state.currentPage - 1) * state.pageSize;
    }

    const getEndIndex = (): number => {
        return state.currentPage * state.pageSize;
    }

    const filterPayments = (payments: ClaimPaymentDto[]) => {
        if (!!state.numberFilter) {
            payments = payments.filter((p) => p.claimNumber.includes(state.numberFilter));
        }

        return payments;
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="container-md">
            <h2>Claim payments</h2>
            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by claim number:</span>
                <input type="text" className="form-control" id="email-filter"
                       name="numberFilter"
                       onChange={handleOnChange}
                       placeholder="12412"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Claim number</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Amount currency</th>
                    <th scope="col">Payment date</th>
                </tr>
                </thead>
                <tbody>
                {state.payments
                    .filter((_, index) => getBeginIndex() <= index && index < getEndIndex())
                    .map((claimPayment, index) => (
                        <React.Fragment key={claimPayment.id}>
                            <tr>
                                <th scope="row">{(state.currentPage - 1) * state.pageSize + index + 1}</th>
                                <td>{claimPayment.claimNumber}</td>
                                <td>{claimPayment.amount}</td>
                                <td>{claimPayment.amountCurrency}</td>
                                <td>{claimPayment.paymentDate.toString()}</td>
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