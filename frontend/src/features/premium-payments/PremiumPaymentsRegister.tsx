import React, {ChangeEvent, useEffect, useState} from 'react';
import { IdType} from "../../models/Identifiable";

import {handleRequest} from "../../shared/BackEndFacade";

interface PaymentsState {
    payments: PremiumPaymentDto[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    numberFilter: string;
}

interface PremiumPaymentDto {
    id: IdType,
    policyId: IdType,
    policyNumber: string,
    amount: string,
    amountCurrency: string,
    paymentDate: string
}

const PremiumPaymentsRegister: React.FC = () => {
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
        const query = `?page=${state.currentPage}&size=${state.pageSize}&policyNumber=${state.numberFilter}`;
        handleRequest("GET", "/api/backoffice/premium-payments" + query)
            .then(resp => resp.json())
            .then(resp => {
                setState({
                    ...state,
                    payments: resp.payments,
                    pageCount: resp.count
                });
            })
            .catch(err => {
            });
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

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="container-md">
            <h2>Premium payments</h2>
            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by policy number:</span>
                <input type="text" className="form-control"
                       name="numberFilter"
                       onChange={handleOnChange}
                       placeholder="12412"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Policy number</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Amount currency</th>
                    <th scope="col">Payment date</th>
                </tr>
                </thead>
                <tbody>
                {state.payments
                    .map((claimPayment, index) => (
                        <React.Fragment key={claimPayment.id}>
                            <tr>
                                <th scope="row">{(state.currentPage - 1) * state.pageSize + index + 1}</th>
                                <td>{claimPayment.policyNumber}</td>
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

export default PremiumPaymentsRegister;