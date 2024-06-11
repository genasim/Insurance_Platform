import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import usersModel from "../models/users.model";
import fs from "fs";
import path from "path";

const privateKey = fs.readFileSync(
    path.join(__dirname, "..", "..", "creds", "private.pem"),
    "utf8"
  );

const loginUserHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user = await usersModel.findOne({ email });
    if (!user) res.status(404).json({ message: "User could not be found" });

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign(
        { id: user._id, email: user.email, rights: user.rights },
        privateKey,
        { algorithm: "RS256", expiresIn: "1h" }
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
