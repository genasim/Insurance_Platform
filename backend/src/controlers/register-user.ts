import { Request, RequestHandler, Response } from "express";
import usersModel, { Right } from "../models/users.model";
import mongoose from "mongoose";

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
    res.status(201).json(user);
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

export default registerClientHandler;
