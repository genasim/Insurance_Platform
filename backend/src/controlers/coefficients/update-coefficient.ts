import {Request, RequestHandler, Response} from "express";
import usersModel from "../../models/users.model";
import coefficientModel from "../../models/coefficients.model";

const updateCoefficientHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id;
        const {policyType, type, description, values, isEnabled} = req.body;

        await coefficientModel.findByIdAndUpdate(id,{
            policyType, type, description, values, isEnabled
        });

        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default updateCoefficientHandler;
