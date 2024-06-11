import { Request, RequestHandler, Response } from "express";
import usersModel, { Right } from "../models/users.model";
import * as bcrypt from "bcrypt";

const loginUserHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user = await usersModel.findOne({ email });
    if (!user) res.status(404).json({ message: "User could not be found" });

    const result = await bcrypt.compare(password, user.password);
    result
      ? res.status(200).json(user)
      : res.status(403).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default loginUserHandler;
