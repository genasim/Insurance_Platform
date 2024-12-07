import { Router } from "express";
import registerClientHandler from "../controlers/register-user";
import loginUserHandler from "../controlers/login-user";
import checkValidEmail from "../controlers/check-valid-email";
import getPolicyTemplatesHandler from "../controlers/policies/get-policy-templates";

const authRouter = Router()

authRouter.post("/register", registerClientHandler)
authRouter.post("/login", loginUserHandler)
authRouter.get("/valid-email",checkValidEmail)
authRouter.get("/policy-types", getPolicyTemplatesHandler)


export default authRouter