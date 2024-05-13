import React, {useEffect, useState} from 'react';
import {ClaimDocument} from "../../models/ClaimDocument";
import API, {Tables} from "../../shared/api-client/ApiClient";

interface DeleteDocumentState {
    documents: ClaimDocument[]
}

const DeleteDocument = () => {
    const [state, setState] = useState<DeleteDocumentState>(
        {
            documents: []
        }
    );

    useEffect(() => {
        API.findAll<ClaimDocument>(Tables.CLAIM_DOCUMENTS)
            .then(response => setState({
                documents: response
            }))
    }, [])
    //Todo number for claim

    const handleOnDelete = (id: string) => {
        API.deleteById<ClaimDocument>(Tables.CLAIM_DOCUMENTS, id)
            .then(() => {
                setState(prevState => ({
                    documents: prevState.documents.filter((c: ClaimDocument) => c.id !== id)
                }));
            })
    }

    return (
        <div>
            <h2>Delete document</h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Claim Id</th>
                    <th scope="col">Last</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {state.documents.map((doc, index) => (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{doc.claimId}</td>
                        <td>{doc.description}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleOnDelete(doc.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteDocument;