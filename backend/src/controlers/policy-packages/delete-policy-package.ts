import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import PolicyPackageModel from "../../models/policy-packages.model";

const deletePolicyPackageHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid policy package id" });
    return;
  }

  try {
    const policyPackage = await PolicyPackageModel.findByIdAndDelete(id);
    if (!policyPackage) {
      res
        .status(404)
        .json({ message: "Could not find policy package to delete" });
      return;
    }

    res.status(200).json(policyPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default deletePolicyPackageHandler;
