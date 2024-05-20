import React, {ChangeEvent, useEffect, useState} from 'react';
import {ClaimDocument} from "../../models/ClaimDocument";
import API, {Tables} from "../../shared/api-client/ApiClient";

interface DeleteDocumentState {
    documents: ClaimDocument[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    claimNumberFilter: string
}

const DeleteDocuments: React.FC = () => {
    const [state, setState] = useState<DeleteDocumentState>(
        {
            documents: [],
            pageCount: 1,
            currentPage: 1,
            pageSize: 5,
            claimNumberFilter: ''
        }
    );

    useEffect(() => {
        API.findAll<ClaimDocument>(Tables.CLAIM_DOCUMENTS)
            .then(docs => {
                const filteredDocuments = filterDocuments(docs);
                const pageCount = calculatePageCount(filteredDocuments);
                setState({
                    ...state,
                    documents: filteredDocuments,
                    pageCount: pageCount,
                    currentPage: state.currentPage <= pageCount ? state.currentPage : 1,
                });
            })
    }, [state.currentPage, state.claimNumberFilter]);

    const handleOnDelete = (id: string) => {
        API.deleteById<ClaimDocument>(Tables.CLAIM_DOCUMENTS, id)
            .then(() => {
                const remainingDocuments = state.documents
                    .filter((c: ClaimDocument) => c.id !== id);
                const filteredDocuments = filterDocuments(remainingDocuments);
                const pageCount = calculatePageCount(filteredDocuments);
                setState({
                    ...state,
                    documents: filteredDocuments,
                    pageCount: pageCount,
                });
            });
    }

    const handleSelectedPageClick = (pageNumber: number) => {
        if (pageNumber < 1 || state.pageCount < pageNumber) {
            return;
        }

        setState({
            ...state,
            currentPage: pageNumber,
        })
    };

    const handleOnPreviousPageClick = () => {
        if (state.currentPage <= 1) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage - 1,
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

    const calculatePageCount = (documents: ClaimDocument[]) => {
        const remainingDocuments = documents.length % state.pageSize;
        const remainingPage: number = remainingDocuments > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(documents.length / state.pageSize + remainingPage);
        return pageCount;
    };

    const getBeginIndex = (): number => {
        return (state.currentPage - 1) * state.pageSize;
    }

    const getEndIndex = (): number => {
        return state.currentPage * state.pageSize;
    }

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
                    .filter((_, index) => getBeginIndex() <= index && index < getEndIndex())
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
                                                    <img src={doc.document} alt="document"></img>
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