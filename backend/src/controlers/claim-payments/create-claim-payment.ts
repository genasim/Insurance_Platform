import {Request, RequestHandler, Response} from "express";
import claimPaymentModel from "../../models/claim-payments.model";

const createClaimPaymentHandler: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const {
        claimId,
        amount,
        amountCurrency,
    } = req.body;

    try {
        const claimPaymentDto = new claimPaymentModel({
            claimId,
            amount,
            amountCurrency,
        })

        const payment = await claimPaymentDto.save();
        res.status(201).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default createClaimPaymentHandler;
