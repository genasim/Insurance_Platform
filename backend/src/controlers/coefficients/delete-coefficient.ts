import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import coefficientModel from "../../models/coefficients.model";

const deleteCoefficientHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing user id" });
    return;
  }

  try {
    await coefficientModel.findByIdAndDelete(id);

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default deleteCoefficientHandler;
