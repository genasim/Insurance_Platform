import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import policyModel from "../../models/policies.model";

const createPolicyHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { type, packageId } = req.body;

  const clientId = (req.user as any)._id;

  try {
    const policyDto = new policyModel({
      type,
      holderId: clientId,
      packageId,
    });

    const policy = await policyDto.save();
    res.status(201).json(policy);
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

export default createPolicyHandler;
