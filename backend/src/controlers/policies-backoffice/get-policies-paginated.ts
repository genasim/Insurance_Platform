import {Request, RequestHandler, Response} from "express";
import policiesModel from "../../models/policies.model";
import policyModel from "../../models/policies.model";

type QueryParams = {
    page: string | number;
    size: string | number;
    number: string;
    holderName: string;
};

const getPoliciesPaginated: RequestHandler = async (
    req: Request,
    res: Response
) => {
    let {page, size, number, holderName} = req.query as QueryParams;
    page = page === "" || !page ? "1" : page;
    size = page === "" || !size ? "10" : size;

    if (isNaN(+page) || isNaN(+size)) {
        res.status(400).json({message: "Invalid page or size info"});
        return;
    }
    page = Number(page);
    size = Number(size);

    number ||= ".*";
    holderName ||= ".*";
    const numberRegex = new RegExp(number, "i");
    const holderRegex = new RegExp(holderName, "i");

    try {

        const policies = await policyModel.aggregate([
            {
                $lookup:
                    {
                        from: "users",
                        localField: "holderId",
                        foreignField: "_id",
                        as: "holder"
                    }
            },
            {
                $lookup:
                    {
                        from: "policy-packages",
                        localField: "packageId",
                        foreignField: "_id",
                        as: "package"
                    }
            },
            {
                $match:
                    {
                        policyNumber: {
                            $regex: number,
                            $options: "i"
                        }
                    }
            },
            {
                $match:
                    {
                        "holder.fullName": {
                            $regex: holderName,
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
                        from: "users",
                        localField: "holderId",
                        foreignField: "_id",
                        as: "holder"
                    }
            },
            {
                $match:
                    {
                        policyNumber: {
                            $regex: number,
                            $options: "i"
                        }
                    }
            },
            {
                $match:
                    {
                        "holder.fullName": {
                            $regex: holderName,
                            $options: "i"
                        }
                    }
            },
            {
                $count: "count"
            }
        ]);

        let count = policiesCount[0]?.count ?? 0;
        const remaining = count % size;
        const remainingPage: number = remaining > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(count / size + remainingPage);

        const policiesDto = policies.map((p: any) => ({
            id: p._id,
            policyNumber: p.policyNumber,
            holderId: p.holderId,
            holderName: p.holder[0]?.fullName ?? "",
            type: p.type,
            packageId: p.packageId,
            package: p.package[0]?.name ?? "",
            premium: p.premium,
            premiumCurrency: p.premiumCurrency,
            coverage: p.package[0]?.coverage ?? [],
            beginDate: p.beginDate,
            endDate: p.endDate,
            purchaseDate: p.purchaseDate
        }));
        res.status(200).json({policies: policiesDto, pageCount});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default getPoliciesPaginated;
