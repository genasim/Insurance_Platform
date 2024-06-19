import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import PolicyPackageModel from "../../models/policy-packages.model";

const createPolicyPackageHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {
    policyType,
    name,
    type,
    basePremium,
    basePremiumCurrency,
    duration,
    durationUnit,
    coverage,
  } = req.body;

  try {
    const policyPackageDto = new PolicyPackageModel({
      policyType,
      name,
      type,
      basePremium,
      basePremiumCurrency,
      duration,
      durationUnit,
      coverage,
    });

    const policyPackage = await policyPackageDto.save();
    res.status(201).json(policyPackage);
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

export default createPolicyPackageHandler;
