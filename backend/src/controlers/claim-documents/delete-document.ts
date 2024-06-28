import {Request, RequestHandler, Response} from "express";
import claimDocumentsModel from "../../models/claim-documents.model";

const deleteClaimDocumentHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id;
        await claimDocumentsModel.findByIdAndDelete(id);

        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default deleteClaimDocumentHandler;
