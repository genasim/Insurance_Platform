import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import claimDocumentModel from "../../models/claim-documents.model";
import claimModel from "../../models/claims.model";

const createClaimHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {
    policyId,
    policyNumber,
    eventDate,
    eventDescription,
    eventType,
    claimedAmount,
    claimedAmountCurrency,
    documents,
  } = req.body;
  const clientId = (req.user as any)._id;

  try {
    const claimDto = new claimModel({
      claimantId: clientId,
      policyId,
      policyNumber,
      eventDate,
      eventDescription,
      eventType,
      claimedAmount,
      claimedAmountCurrency,
    });

    if (documents) {
      if (!Array.isArray(documents)) {
        res.status(400).json({ message: "Documents field is not an array" });
        return;
      }

      for (const doc of documents) {
        const documentDto = new claimDocumentModel({
          claimId: claimDto._id,
          description: (doc as any).description,
          document: (doc as any).document,
        });
        await documentDto.save();
      }
    }

    const claim = await claimDto.save();
    res.status(201).json({ claim });
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

export default createClaimHandler;
