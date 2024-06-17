import { Request, RequestHandler, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import path from "path";
import usersModel, { Right } from "../models/users.model";

const privateKey = fs.readFileSync(
  path.join(__dirname, "..", "..", "creds", "private.pem"),
  "utf8"
);

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
      privateKey,
      { algorithm: "RS256", expiresIn: "1h" }
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
      res.status(400).json({ errors: validationErrors });
      return;
    }

    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default registerClientHandler;
