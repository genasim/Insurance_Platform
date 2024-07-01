import { Request, RequestHandler, Response } from "express";
import PolicyType from "../../types/PolicyType";
import coefficientModel from "../../models/coefficients.model";

const getPolicyTypeCoefficientsHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { type } = req.params;

  if (
    !Object.values(PolicyType)
      .map((policy) => policy.toString())
      .includes(type)
  ) {
    res.status(400).json({ message: `Invalid policy type ${type}` });
    return;
  }

  try {
    const coefficients = await coefficientModel.find({ policyType: type });
    if (!coefficients) {
      res.status(404).json({ message: `Could not find coefficients for type ${type}`  });
      return;
    }

    res.status(200).json(coefficients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getPolicyTypeCoefficientsHandler;
