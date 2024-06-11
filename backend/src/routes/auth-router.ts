import { Router } from "express";
import registerClientHandler from "../controlers/register-user";

const authRouter = Router()

authRouter.post("/register", registerClientHandler)

export default authRouter