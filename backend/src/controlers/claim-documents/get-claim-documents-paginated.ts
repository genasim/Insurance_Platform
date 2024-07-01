import { Request, RequestHandler, Response } from "express";

import claimDocumentsModel from "../../models/claim-documents.model";

type QueryParams = {
    page: string | number;
    size: string | number;
    number: string;
};

const getClaimDocumentsHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    let { page, size, number } = req.query as QueryParams;
    page = page === "" || !page ? "1" : page;
    size = page === "" || !size ? "10" : size;

    if (isNaN(+page) || isNaN(+size)) {
        res.status(400).json({ message: "Invalid page or size info" });
        return;
    }
    page = Number(page);
    size = Number(size);

    try {
        const documents = await claimDocumentsModel.aggregate([
            {
                $lookup:
                    {
                        from: "claims",
                        localField: "claimId",
                        foreignField: "_id",
                        as: "claim"
                    }
            },
            {
                $match:
                    {
                        "claim.claimNumber": {
                            $regex: number ?? ".*",
                            $options: "i"
                        }
                    }
            },
            {
                $sort:
                    {
                        _id: 1
                    }
            },
            {
                $skip: (page - 1) * size
            },
            {
                $limit: size
            }
        ]);

        const documentsCount: any = await claimDocumentsModel.aggregate([
            {
                $lookup:
                    {
                        from: "claims",
                        localField: "claimId",
                        foreignField: "_id",
                        as: "claim"
                    }
            },
            {
                $count: "count"
            }
        ]);

        const claimDocumentsCountValue = documentsCount[0]?.count ?? 0;
        const remaining = claimDocumentsCountValue % size;
        const remainingPage: number = remaining > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(claimDocumentsCountValue / size + remainingPage);

        const response = documents.map((claimDocument) => ({
            id: claimDocument._id,
            description: claimDocument.description,
            document: claimDocument.document,
            claimNumber: claimDocument.claim[0].claimNumber
        }));

        res.status(200).json({ documents: response, pageCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export default getClaimDocumentsHandler;
