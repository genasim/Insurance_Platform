import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import PolicyPackageModel from "../../models/policy-packages.model";
import PolicyType from "../../types/PolicyType";

const getPolicyTypePackagesHandler: RequestHandler = async (
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
    const packages = await PolicyPackageModel.find({ policyType: type });
    if (!packages) {
      res.status(404).json({ message: `Could not find policy package for type ${type}`  });
      return;
    }

    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getPolicyTypePackagesHandler;
