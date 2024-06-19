import { Router } from "express";
import createPolicyPackageHandler from "../controlers/policy-packages/create-policy-package";

const epxertRouter = Router()

epxertRouter.post("/policy-packages", createPolicyPackageHandler)

export default epxertRouter;