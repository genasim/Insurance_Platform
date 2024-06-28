import { Request, RequestHandler, Response } from "express";
import usersModel from "../../models/users.model";
import Right from "../../types/Right";
import claimDocumentsModel from "../../models/claim-documents.model";

type QueryParams = {
    page: string | number;
    size: string | number;
    email: string;
    idNumber: string;
};

const getClaimDocumentsHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    let { page, size, email, idNumber } = req.query as QueryParams;
    page = page === "" || !page ? "1" : page;
    size = page === "" || !size ? "10" : size;

    if (isNaN(+page) || isNaN(+size)) {
        res.status(400).json({ message: "Invalid page or size info" });
        return;
    }
    page = Number(page);
    size = Number(size);

    const emailRegex = new RegExp(email || ".*", "i");
    const numberRegex = new RegExp(idNumber || ".*", "i");

    try {
        const claimDocuments = await claimDocumentsModel
            .find({
                // email: { $regex: emailRegex },
                // idNumber: { $regex: numberRegex },
            })
            .sort()
            .skip((page - 1) * size)
            .limit(size);


        const claimDocumentsCount = await claimDocumentsModel.countDocuments({
            // email: { $regex: emailRegex },
            // idNumber: { $regex: numberRegex },
        });

        const remaining = claimDocumentsCount % size;
        const remainingPage: number = remaining > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(claimDocumentsCount / size + remainingPage);

        const response = claimDocuments.map((claimDocument) => ({
            id: claimDocument._id,
            description: claimDocument.description,
            document: claimDocument.document,
            claimNumber: claimDocument.claimNumber
        }));

        res.status(200).json({ documents: response, pageCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export default getClaimDocumentsHandler;
