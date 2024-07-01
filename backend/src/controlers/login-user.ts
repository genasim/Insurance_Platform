import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import usersModel from "../models/users.model";

const loginUserHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const user = await usersModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User could not be found" });
      return;
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
    const token = jwt.sign(
      { id: user._id, email: user.email, rights: user.rights },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
    } else {
    res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default loginUserHandler;
