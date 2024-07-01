import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import claimDocumentModel from "../../models/claim-documents.model";
import claimModel from "../../models/claims.model";
import PolicyPackageModel from "../../models/policy-packages.model";
import policyModel from "../../models/policies.model";

const getClaimInfoHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  try {
    const claim = await claimModel.findById(id);
    if (!claim) {
      res.status(404).json({ message: "Could not find claim" });
      return;
    }

    const documents = await claimDocumentModel.find({ claimId: claim.id });
    const policy = await policyModel.findById(claim.policyId);
    const policyPackage = await PolicyPackageModel.findById(policy.packageId);

    res.status(200).json({ claim, documents, policyPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getClaimInfoHandler;
