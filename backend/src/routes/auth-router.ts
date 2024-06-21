import { Router } from "express";
import registerClientHandler from "../controlers/register-user";
import loginUserHandler from "../controlers/login-user";

const authRouter = Router()

authRouter.post("/register", registerClientHandler)
authRouter.post("/login", loginUserHandler)

export default authRouter