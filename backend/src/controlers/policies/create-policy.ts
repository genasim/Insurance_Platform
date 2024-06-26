import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import policyModel from "../../models/policies.model";
import coefficientModel from "../../models/coefficients.model";
import PolicyPackageModel from "../../models/policy-packages.model";

const createPolicyHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { type, packageId, beginDate, coefficients } = req.body;

  const clientId = (req.user as any)._id;

  try {
    if (!coefficients || !Array.isArray(coefficients) ) {
      return res.status(400).json({ message: "Invalid coefficients array field" })
    }

    for (const coeff of coefficients) {
      const coefficient = await coefficientModel.findById(coeff.id)
      if (!coefficient) {
        return res.status(404).json({ message: `Could not find coefficient for ${type} with id ${coeff.id}` })
      }
      if (coefficient.values.every(value => value.value !== coeff.value)) {
        return res.status(400).json({ message: `Invalid value ${coeff.value} for coefficient for ${type} with id ${coefficient._id}` })
      }
    }
    
    const polPackage = await PolicyPackageModel.findById(packageId)
    const endCoefficient = coefficients.reduce((acc, coef) => (acc *= coef.value), 1)
    const premium = (polPackage.basePremium * endCoefficient).toFixed(2)

    const policyDto = new policyModel({
      type,
      holderId: clientId,
      packageId,
      beginDate,
      premium,
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
