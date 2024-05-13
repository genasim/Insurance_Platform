import React, {useEffect, useState} from 'react';
import {ClaimDocument} from "../../models/ClaimDocument";
import API, {Tables} from "../../shared/api-client/ApiClient";

interface DeleteDocumentState {
    documents: ClaimDocument[];
    pageCount: number;
    currentPage: number;
}

const DeleteDocument = () => {
    const pageSize = 3;
    const [state, setState] = useState<DeleteDocumentState>(
        {
            documents: [],
            pageCount: 0,
            currentPage: 0
        }
    );

    useEffect(() => {
        API.findAll<ClaimDocument>(Tables.CLAIM_DOCUMENTS)
            .then(docs => {
                const pageCount = calculatePageCount(docs);
                setState({
                    ...state,
                    documents: docs,
                    pageCount: pageCount,
                });
            })
    }, []);

    const handleOnDelete = (id: string) => {
        API.deleteById<ClaimDocument>(Tables.CLAIM_DOCUMENTS, id)
            .then(() => {
                const remainingDocuments = state.documents
                    .filter((c: ClaimDocument) => c.id !== id);
                const pageCount = calculatePageCount(remainingDocuments);
                setState({
                    ...state,
                    documents: remainingDocuments,
                    pageCount: pageCount,
                });
            })
    }

    const handleOnPreviousPageClick = () => {
        if (state.currentPage < 1) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage - 1,
        })
    };

    //ToDO middle pages and todo filter function
    const handleOnNextPageClick = () => {
        if (state.currentPage >= state.pageCount - 1) {
            return;
        }

        setState({
            ...state,
            currentPage: state.currentPage + 1,
        })
    };

    const calculatePageCount = (documents: ClaimDocument[]) => {
        const remainingDocuments = documents.length % pageSize;
        const remainingPage = remainingDocuments > 0 ? 1 : 0;
        const pageCount = documents.length / pageSize + remainingPage;
        return pageCount;
    };

    const getBeginIndex = (): number => {
        return state.currentPage * pageSize;
    }

    const getEndIndex = (): number => {
        return (state.currentPage + 1) * pageSize;
    }

    return (
        <div>
            <h2>Delete document</h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Claim Id</th>
                    <th scope="col">Number</th>
                    <th scope="col">Last</th>
                    <th scope="col" className="text-end">
                        <span className="me-4">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {state.documents
                    .filter((doc, index) => getBeginIndex() <= index && index < getEndIndex())
                    .map((doc, index) => (
                        <tr key={doc.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{doc.claimId}</td>
                            <td>{doc.claimNumber}</td>
                            <td>{doc.description}</td>
                            <td className="text-end">
                                <button className="btn btn-danger me-3" onClick={() => handleOnDelete(doc.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Delete document pagination" className="navbar justify-content-end">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link"
                                                 onClick={handleOnPreviousPageClick}>Previous</a></li>
                    {}
                    <li className="page-item"><a className="page-link">1</a></li>
                    <li className="page-item"><a className="page-link">2</a></li>
                    <li className="page-item"><a className="page-link">3</a></li>
                    <li className="page-item"><a className="page-link"
                                                 onClick={handleOnNextPageClick}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DeleteDocument;