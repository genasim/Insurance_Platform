import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import claimModel from "../../models/claims.model";

const updateClaimHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { claim } = req.body;

  try {
    await claimModel.validate(claim)    
    const updated = await claimModel.findByIdAndUpdate(claim._id, claim);

    res.status(201).json(updated);
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

export default updateClaimHandler;
