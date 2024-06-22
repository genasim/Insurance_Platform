import { Router } from "express";
import registerClientHandler from "../controlers/register-user";
import loginUserHandler from "../controlers/login-user";
import checkValidEmail from "../controlers/check-valid-email";

const authRouter = Router()

authRouter.post("/register", registerClientHandler)
authRouter.post("/login", loginUserHandler)
authRouter.post("/valid-email",checkValidEmail)

export default authRouter