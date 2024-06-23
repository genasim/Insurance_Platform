import React, {ChangeEvent, useEffect, useState} from 'react';
import API, {Tables} from "../../shared/api-client/ApiClient";
import {Notification} from "../../models/Notification";

interface NotificationsState {
    notifications: Notification[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    titleFilter: string;
}


const NotificationRegister: React.FC = () => {
    const [state, setState] = useState<NotificationsState>(
        {
            notifications: [],
            pageCount: 1,
            currentPage: 1,
            pageSize: 5,
            titleFilter: '',
        }
    );

    useEffect(() => {
        API.findAll<Notification>(Tables.NOTIFICATIONS)
            .then(notifications => {
                const pageCount = calculatePageCount(notifications);
                setState({
                    ...state,
                    notifications: notifications,
                    pageCount: pageCount,
                    currentPage: state.currentPage <= pageCount ? state.currentPage : 1,
                });
            })
    }, [state.currentPage, state.titleFilter]);

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

    const calculatePageCount = (notifications: Notification[]) => {
        const remainingUsers = notifications.length % state.pageSize;
        const remainingPage: number = remainingUsers > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(notifications.length / state.pageSize + remainingPage);
        return pageCount;
    };

    const getBeginIndex = (): number => {
        return (state.currentPage - 1) * state.pageSize;
    }

    const getEndIndex = (): number => {
        return state.currentPage * state.pageSize;
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="container-md">
            <h2>Notifications</h2>
            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by title:</span>
                <input type="text" className="form-control"
                       name="titleFilter"
                       onChange={handleOnChange}
                       placeholder="Title"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Message</th>
                    <th scope="col">Created at</th>
                </tr>
                </thead>
                <tbody>
                {state.notifications
                    .filter((_, index) => getBeginIndex() <= index && index < getEndIndex())
                    .map((claimPayment, index) => (
                        <React.Fragment key={claimPayment.id}>
                            <tr>
                                <th scope="row">{(state.currentPage - 1) * state.pageSize + index + 1}</th>
                                <td>{claimPayment.title}</td>
                                <td>{claimPayment.message}</td>
                                <td>{claimPayment.createdAt}</td>
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

export default NotificationRegister;