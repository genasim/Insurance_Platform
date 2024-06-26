import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import policyModel from "../../models/policies.model";

const getPolicyHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  console.log(id);
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  try {
    const policy = await policyModel.findById(id);
    if (!policy) {
      res.status(404).json({ message: "Could not find policy" });
      return;
    }

    res.status(200).json(policy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getPolicyHandler;
