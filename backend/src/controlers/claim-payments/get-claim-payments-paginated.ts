import {Request, RequestHandler, Response} from "express";
import claimPaymentModel from "../../models/claim-payments.model";

type QueryParams = {
    page: string | number;
    size: string | number;
    claimNumber: string;
};

const getClaimPaymentsPaginated: RequestHandler = async (
    req: Request,
    res: Response
) => {
    let {page, size, claimNumber} = req.query as QueryParams;
    page = page === "" || !page ? "1" : page;
    size = page === "" || !size ? "10" : size;

    if (isNaN(+page) || isNaN(+size)) {
        res.status(400).json({message: "Invalid page or size info"});
        return;
    }

    page = Number(page);
    size = Number(size);

    try {
        const payments = await claimPaymentModel.aggregate([
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
                            $regex: claimNumber ?? ".*",
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

        const claimCount: any = await claimPaymentModel.aggregate([
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
                            $regex: claimNumber ?? ".*",
                            $options: "i"
                        }
                    }
            },
            {
                $count: "count"
            }
        ]);

        const claimCountValue = claimCount[0]?.count ?? 0;
        const remaining = claimCountValue % size;
        const remainingPage: number = remaining > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(claimCountValue / size + remainingPage);
        const paymentDtos = payments.map(c => ({
            claimId: c.claimId,
            claimNumber: c.claim[0]?.claimNumber ?? "",
            amount: c.amount,
            amountCurrency: c.amountCurrency,
            paymentDate: c.paymentDate,
        }));

        res.status(200).json({payments: paymentDtos, pageCount});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default getClaimPaymentsPaginated;
