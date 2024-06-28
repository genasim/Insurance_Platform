import {Request, RequestHandler, Response} from "express";
import mongoose from "mongoose";
import usersModel from "../../models/users.model";
import coefficientModel from "../../models/coefficients.model";

const createUserHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const {policyType, type, description, values, isEnabled} = req.body;
    try {
        const coefficientWithSamePolicyTypeAndType = await coefficientModel.findOne({
            policyType: policyType,
            type: type
        });

        if (coefficientWithSamePolicyTypeAndType) {
            res.status(400).json({message: 'Coefficient exists'});
            return;
        }

        const userDto = {
            policyType,
            type,
            description,
            values,
            isEnabled,
        };

        const coefficient = await coefficientModel.create(userDto);
        res.status(201).json({
            id: coefficient._id,
        });
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
