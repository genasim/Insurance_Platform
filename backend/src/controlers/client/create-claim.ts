import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import claimModel from "../../models/claims.model";

const createClaimHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {
    policyId,
    policyNumber,
    eventDate,
    eventDescription,
    eventType,
    claimedAmount,
    claimedAmountCurrency,
    documents
  } = req.body;
  const clientId = (req.user as any)._id;

  try {
    const claimDto = new claimModel({
      claimantId: clientId,
      policyId,
      policyNumber,
      eventDate,
      eventDescription,
      eventType,
      claimedAmount,
      claimedAmountCurrency,
    });

    const claim = await claimDto.save();

    

    res.status(201).json({ claim });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors: { [key: string]: string } = {};
      for (const key in error.errors) {
        if (error.errors[key] && error.errors[key].message) {
          validationErrors[key] = error.errors[key].message;
        }
      }
      res.status(400).json({ errors: validationErrors });
      return;
    }

    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default createClaimHandler;
