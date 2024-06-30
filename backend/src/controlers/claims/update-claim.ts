import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import claimModel from "../../models/claims.model";
import policyModel from "../../models/policies.model";
import notificationModel from "../../models/notifications.model";
import claimPaymentModel from "../../models/claim-payments.model";

const updateClaimHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { claim } = req.body;

  try {
    await claimModel.validate(claim)    
    const updated = await claimModel.findByIdAndUpdate(claim._id, claim);
    const policy = await policyModel.findOne({policyNumber: claim.policyNumber});

    if(claim.status == "APPROVED") {
      const payment = {
        claimId: claim._id,
        claimNumber: claim.claimNumber,
        amount: claim.claimedAmount,
        amountCurrency: claim.claimedAmountCurrency,
        paymentDate: new Date(),
      };
      await claimPaymentModel.create(payment);
    }

    const notification =  {
      title: `Claim ${claim.claimNumber} ${claim.status}!`,
      message: `Claim ${claim.claimNumber} ${claim.status}`,
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
