import {Request, RequestHandler, Response} from "express";
import premiumPaymentModel from "../../models/premium-payments.model";
import policyModel from "../../models/policies.model";

type QueryParams = {
    page: string | number;
    size: string | number;
    policyNumber: string;
};

const getPremiumPaymentsPaginated: RequestHandler = async (
    req: Request,
    res: Response
) => {
    let {page, size, policyNumber} = req.query as QueryParams;
    page = page === "" || !page ? "1" : page;
    size = page === "" || !size ? "10" : size;

    if (isNaN(+page) || isNaN(+size)) {
        res.status(400).json({message: "Invalid page or size info"});
        return;
    }

    page = Number(page);
    size = Number(size);

    try {
        const payments = await premiumPaymentModel.aggregate([
            {
                $lookup:
                    {
                        from: "policies",
                        localField: "policyId",
                        foreignField: "_id",
                        as: "policy"
                    }
            },
            {
                $match:
                    {
                        "policy.policyNumber": {
                            $regex: policyNumber ?? ".*",
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

        const policiesCount: any = await policyModel.aggregate([
            {
                $lookup:
                    {
                        from: "policies",
                        localField: "policyId",
                        foreignField: "_id",
                        as: "policy"
                    }
            },
            {
                $match:
                    {
                        policyNumber: {
                            $regex: policyNumber ?? ".*",
                            $options: "i"
                        }
                    }
            },
            {
                $count: "count"
            }
        ]);

        const policyCountValue = policiesCount[0]?.count ?? 0;
        const remaining = policyCountValue % size;
        const remainingPage: number = remaining > 0 ? 1 : 0;
        const count: number = Math.trunc(policyCountValue / size + remainingPage);
        const paymentDtos = payments.map(p => ({
            policyId: p.policyId,
            policyNumber: p.policy?.policyNumber ?? "",
            amount: p.amount,
            amountCurrency: p.amountCurrency,
            paymentDate: p.paymentDate,
        }));

        res.status(200).json({payments: paymentDtos, count});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default getPremiumPaymentsPaginated;
