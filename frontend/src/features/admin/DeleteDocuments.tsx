import React, {ChangeEvent, useEffect, useState} from 'react';
import {ClaimDocument} from "../../models/ClaimDocument";
import {handleRequest} from "../../shared/BackEndFacade";

interface DeleteDocumentState {
    documents: ClaimDocument[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    claimNumberFilter: string,
    isDeleted: boolean
}

const DeleteDocuments: React.FC = () => {
    const [state, setState] = useState<DeleteDocumentState>(
        {
            documents: [],
            pageCount: 1,
            currentPage: 1,
            pageSize: 5,
            claimNumberFilter: '',
            isDeleted: false
        }
    );

    useEffect(() => {
        const query = `?page=${state.currentPage}&size=${state.pageSize}&number=${state.claimNumberFilter}`;
        handleRequest("GET", "/api/admin/claim-documents" + query)
            .then(resp => resp.json())
            .then(resp => {
                setState({
                    ...state,
                    documents: resp.documents,
                    pageCount: resp.pageCount,
                    isDeleted: false,
                });
            })
            .catch(err => {
            });
    }, [state.currentPage, state.claimNumberFilter, state.isDeleted]);

    const handleOnDelete = (id: string) => {
        handleRequest("DELETE", `/api/admin/claim-documents/${id}`)
            .then(() => {
                setState({
                    ...state,
                    isDeleted: true
                });
            })
            .catch(err => {
            });
    }

    const handleSelectedPageClick = (pageNumber: number) => {
        if (pageNumber < 1 || state.pageCount < pageNumber) {
            return;
        }

        setState({
            ...state,
            currentPage: pageNumber,
            documents: []
        })
    };

    const handleOnPreviousPageClick = () => {
        if (state.currentPage <= 1) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage - 1,
            documents: []
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

    const filterDocuments = (documents: ClaimDocument[]) => {
        if (!!state.claimNumberFilter) {
            documents = documents.filter((c: ClaimDocument) => c.claimNumber.includes(state.claimNumberFilter!));
        }
        return documents;
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div>
            <h2 className="h2 mb-4">Delete document</h2>
            <div className="mb-4 input-group" style={{width: "30%", minWidth: "fit-content"}}>
                <span className="input-group-text">Filter by claim number:</span>
                <input type="text" className="form-control" id="claim-number-filter"
                       name="claimNumberFilter"
                       onChange={handleOnChange}
                       placeholder="0821"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Claim Number</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-end">
                        <span className="me-4">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {state.documents
                    .map((doc, index) => (
                        <React.Fragment key={doc.id}>
                            <tr>
                                <th scope="row">{(state.currentPage - 1) * state.pageSize + index + 1}</th>
                                <td>{doc.claimNumber}</td>
                                <td>{doc.description}</td>
                                <td className="text-end">
                                    <button className="btn btn-primary me-3" data-bs-toggle="modal"
                                            data-bs-target={`#preview-document-modal-${doc.id}`}>Preview
                                    </button>
                                    <button className="btn btn-danger me-3"
                                            onClick={() => handleOnDelete(doc.id)}>Delete
                                    </button>
                                    <div className="modal fade border" id={`preview-document-modal-${doc.id}`}
                                         tabIndex={-1}
                                         aria-labelledby="modal-body"
                                         aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button className="btn-close" type="button" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body text-center">
                                                    <img src={doc.document} alt="document" className="img-fluid"></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Delete document pagination" className="navbar justify-content-end">
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

export default DeleteDocuments;