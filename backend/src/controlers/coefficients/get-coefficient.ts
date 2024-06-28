import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import coefficientModel from "../../models/coefficients.model";

const getCoefficientHandler: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing id" });
    return;
  }

  try {
    const coefficient = await coefficientModel.findById(id);
    if (!coefficient) {
      res.status(404).json({ message: "Could not find coefficient" });
      return;
    }

    res.status(200).json(coefficient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getCoefficientHandler;
