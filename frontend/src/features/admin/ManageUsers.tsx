/* eslint-disable react-hooks/exhaustive-deps */
import React, {ChangeEvent, useEffect, useState} from 'react';
import {User} from "../../models/User";
import {useNavigate} from "react-router-dom";
import {handleRequest} from "../../shared/BackEndFacade";

interface ManageUserState {
    users: User[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    idNumberFilter: string;
    emailFilter: string;
}

const ManageUsers: React.FC = () => {
    const [state, setState] = useState<ManageUserState>(
        {
            users: [],
            pageCount: 1,
            currentPage: 1,
            pageSize: 5,
            idNumberFilter: '',
            emailFilter: ''
        }
    );

    const navigate = useNavigate();

    useEffect(() => {
        const query = `?page=${state.currentPage}&size=${state.pageSize}&idNumber=${state.idNumberFilter}&email=${state.emailFilter}`;
        handleRequest('GET', '/api/admin/users' + query)
            .then(resp => resp.json())
            .then(resp => {
                setState({
                    ...state,
                    users: resp.users,
                    pageCount: resp.pageCount,
                });
            })
            .catch(err => {
            });
    }, [state.currentPage, state.idNumberFilter, state.emailFilter]);

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
            users: [],
        })
    };

    const handleOnNextPageClick = () => {
        if (state.currentPage >= state.pageCount) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage + 1,
            users: [],
        })
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div>
            <h2>Manage users</h2>
            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by id number:</span>
                <input type="text" className="form-control" id="id-number-filter"
                       name="idNumberFilter"
                       onChange={handleOnChange}
                       placeholder="8804127324"/>
            </div>
            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by email:</span>
                <input type="text" className="form-control"
                       name="emailFilter"
                       onChange={handleOnChange}
                       placeholder="george@domains.com"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Id number</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Rights</th>
                    <th scope="col" className="text-end">
                        <span className="me-4">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {state.users
                    .map((user, index) => (
                        <React.Fragment key={user.id}>
                            <tr>
                                <th scope="row">{(state.currentPage - 1) * state.pageSize + index + 1}</th>
                                <td>{user.email}</td>
                                <td>{user.idNumber}</td>
                                <td>{user.fullName}</td>
                                <td>{user.rights.join(", ")}</td>
                                <td className="text-end">
                                    <button className="btn btn-primary me-3" onClick={() => {
                                        navigate(`users/${user.id}`)
                                    }}>
                                        Edit
                                    </button>
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

export default ManageUsers;