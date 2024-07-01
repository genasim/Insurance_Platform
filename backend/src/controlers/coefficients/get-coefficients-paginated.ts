import { Request, RequestHandler, Response } from "express";
import coefficientModel from "../../models/coefficients.model";
import PolicyType from "../../types/PolicyType";

type QueryParams = {
    page: string | number;
    size: string | number;
    type: string;
    policyType: string;
};

const getCoefficientsPaginatedHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    let { page, size, type, policyType } = req.query as QueryParams;
    page = page === "" || !page ? "1" : page;
    size = page === "" || !size ? "10" : size;

    if (isNaN(+page) || isNaN(+size)) {
        res.status(400).json({ message: "Invalid page or size info" });
        return;
    }
    page = Number(page);
    size = Number(size);

    const typeRegex = new RegExp(type || ".*", "i");
    const policyTypeRegex = new RegExp(policyType || ".*", "i");

    try {
        const users = await coefficientModel
            .find({
                type: { $regex: typeRegex },
                policyType: { $regex: policyTypeRegex },
            })
            .sort()
            .skip((page - 1) * size)
            .limit(size);

        const coefficientsCount = await coefficientModel.countDocuments({
            type: { $regex: typeRegex },
            policyType: { $regex: policyTypeRegex },
        });

        const remainingUsers = coefficientsCount % size;
        const remainingPage: number = remainingUsers > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(coefficientsCount / size + remainingPage);

        const coefficientsDtos = users.map((coefficient) => ({
            id: coefficient._id,
            policyType: coefficient.policyType,
            type: coefficient.type,
            description: coefficient.description,
            values: coefficient.values,
            isEnabled: coefficient.isEnabled,
        }));


        res.status(200).json({ coefficients: coefficientsDtos, pageCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export default getCoefficientsPaginatedHandler;
