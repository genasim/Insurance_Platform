import { Request, RequestHandler, Response } from "express";
import usersModel from "../../models/users.model";
import mongoose from "mongoose";

const getUserHandler: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing user id" });
    return;
  }

  try {
    const user = await usersModel.findById(id);
    if (!user) {
      res.status(404).json({ message: "Could not find user" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getUserHandler;
