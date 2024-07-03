import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import usersModel from "../models/users.model";
import Right from "../types/Right";

const registerClientHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password, fullName } = req.body;

  try {
    const userDto = {
      email,
      password,
      fullName,
      rights: [Right.CLIENT],
    };

    const user = await usersModel.create(userDto);
    const token = jwt.sign(
      { id: user._id, email: user.email, rights: user.rights },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors: { [key: string]: string } = {};
      for (const key in error.errors) {
        if (error.errors[key] && error.errors[key].message) {
          validationErrors[key] = error.errors[key].message;
        }
      }
      res.status(400).json({ error: validationErrors });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export default registerClientHandler;
