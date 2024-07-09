import { Request, RequestHandler, Response } from "express";
import usersModel from "../models/users.model";

const checkValidEmail: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Missing email" });
  }

  try {
    const user = await usersModel.countDocuments({ email });
    if (user === 0) {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default checkValidEmail;
