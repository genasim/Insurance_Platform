import { Request, RequestHandler, Response } from "express";
import usersModel from "../../models/users.model";

type QueryParams = {
    page: string | number;
    size: string | number;
    email: string;
    number: string;
};

const getUsersPaginatedHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    let { page, size, email, number } = req.query as QueryParams;
    page = page === "" || !page ? "1" : page;
    size = page === "" || !size ? "10" : size;

    if (isNaN(+page) || isNaN(+size)) {
        res.status(400).json({ message: "Invalid page or size info" });
        return;
    }
    page = Number(page);
    size = Number(size);

    const emailRegex = new RegExp(email || ".*", "i");
    const numberRegex = new RegExp(number || ".*", "i");

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

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export default getUsersPaginatedHandler;
