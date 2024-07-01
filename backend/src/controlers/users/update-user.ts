import {Request, RequestHandler, Response} from "express";
import usersModel from "../../models/users.model";

const updateUserHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id;
        const {email, fullName, rights} = req.body;

        await usersModel.findByIdAndUpdate(id,{
            email, fullName, rights
        });

        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default updateUserHandler;
