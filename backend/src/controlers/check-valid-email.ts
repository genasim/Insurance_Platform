import { Request, RequestHandler, Response } from "express";
import usersModel from "../models/users.model";

const checkValidEmail: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing email" });
  }

  try {
    const user = await usersModel.countDocuments({ email });
    if (user === 0) {
      res.status(200).json({ message: "Email is valid" });
    } else {
      res.status(400).json({ message: "Email is invalid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default checkValidEmail;
