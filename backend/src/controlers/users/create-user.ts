import {Request, RequestHandler, Response} from "express";
import mongoose from "mongoose";
import usersModel from "../../models/users.model";

const createUserHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const {email, password, fullName, idNumber, rights} = req.body;

    try {
        const userWithSameEmail = await usersModel.findOne({email});
        if (userWithSameEmail) {
            throw new Error(`User with email ${email} already exists`);
        }

        const userWithSameIdNumber = await usersModel.findOne({idNumber});
        if (userWithSameIdNumber) {
            throw new Error(`User with id number ${idNumber} already exists`);
        }

        const userDto = {
            email,
            password,
            fullName,
            idNumber,
            rights,
        };
        const user = await usersModel.create(userDto);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const validationErrors: { [key: string]: string } = {};
            for (const key in error.errors) {
                if (error.errors[key] && error.errors[key].message) {
                    validationErrors[key] = error.errors[key].message;
                }
            }
            res.status(400).json({errors: validationErrors});
            return;
        }

        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default createUserHandler;
