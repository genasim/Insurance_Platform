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

        const remaining = policiesCount[0].count % size;
        const remainingPage: number = remaining > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(policiesCount[0].count / size + remainingPage);


        res.status(200).json({policies, pageCount});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default getPoliciesPaginated;
