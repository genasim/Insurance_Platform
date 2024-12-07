import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import claimModel from "../../models/claims.model";
import policyModel from "../../models/policies.model";
import notificationModel from "../../models/notifications.model";
import claimPaymentModel from "../../models/claim-payments.model";
import ClaimStatus from "../../types/ClaimStatus";

const updateClaimHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { claim, approvedAmount, approvedAmountCurrency } = req.body;
  const { claimId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(claimId)) {
    return res.status(400).json({ message: "Invalid claimId" })
  }
  const oldClaim = await claimModel.findById(claimId);
  if (!oldClaim) {
    return res.status(404).json({ message: "Could not find claim to update" })
  }

  try {
    await claimModel.validate(claim)    
    const updated = await claimModel.findByIdAndUpdate(claimId, claim);
    const policy = await policyModel.findOne({policyNumber: claim.policyNumber});

    if (claim.status === ClaimStatus.APPROVED) {
      const payment = {
        claimId,
        claimNumber: claim.claimNumber,
        amount: approvedAmount,
        amountCurrency: approvedAmountCurrency,
      };
      await claimPaymentModel.create(payment);
    }

    const notification =  {
      title: `Claim ${claim.claimNumber} ${claim.status}!`,
      message: `Claim ${claim.claimNumber} has been ${claim.status}`,
      recipientId: policy.holderId,
      createdAt: new Date()
    };
    await notificationModel.create(notification);

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
