import { Request, RequestHandler, Response } from "express";
import usersModel from "../../models/users.model";
import mongoose from "mongoose";

const deleteUserHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing user id" });
    return;
  }

  try {
    const user = await usersModel.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "Could not find user" });
      return;
    }

    res
      .status(200)
      .json({ _id: user._id, idNumber: user.idNumber, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default deleteUserHandler;
