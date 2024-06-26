import { Router } from "express";
import createPolicyPackageHandler from "../controlers/policy-packages/create-policy-package";
import deletePolicyPackageHandler from "../controlers/policy-packages/delete-policy-package";
import getPolicyPackageHandler from "../controlers/policy-packages/get-policy-package-id";
import getClaimInfoHandler from "../controlers/claims/get-claim-info";

const epxertRouter = Router()

epxertRouter.get("/policy-packages/:id", getPolicyPackageHandler)
epxertRouter.post("/policy-packages", createPolicyPackageHandler)
epxertRouter.delete("/policy-packages/:id", deletePolicyPackageHandler)

epxertRouter.get("/claim/:id", getClaimInfoHandler)

export default epxertRouter;