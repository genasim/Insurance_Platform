import { Request, RequestHandler, Response } from "express";
import usersModel from "../../models/users.model";

type QueryParams = {
    page: string | number;
    size: string | number;
    email: string;
    idNumber: string;
};

const getUsersPaginatedHandler: RequestHandler = async (
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
        const users = await usersModel
            .find({
                email: { $regex: emailRegex },
                idNumber: { $regex: numberRegex },
            })
            .skip((page - 1) * size)
            .limit(size);

        users.forEach((user) => {
            delete user.password;
        });

        const userCount = await usersModel.countDocuments({
            email: { $regex: emailRegex },
            idNumber: { $regex: numberRegex },
        });

        const remainingUsers = userCount % size;
        const remainingPage: number = remainingUsers > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(userCount / size + remainingPage);

        res.status(200).json({ users, pageCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export default getUsersPaginatedHandler;
