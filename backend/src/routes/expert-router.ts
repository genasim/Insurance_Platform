import { Router } from "express";
import createPolicyPackageHandler from "../controlers/policy-packages/create-policy-package";
import deletePolicyPackageHandler from "../controlers/policy-packages/delete-policy-package";
import getPolicyPackageHandler from "../controlers/policy-packages/get-policy-package-id";
import getClaimInfoHandler from "../controlers/claims/get-claim-info";
import getClaimsPaginatedHandler from "../controlers/claims/get-claims-paginated";
import updateClaimHandler from "../controlers/claims/update-claim";

const epxertRouter = Router()

epxertRouter.get("/policy-packages/:id", getPolicyPackageHandler)
epxertRouter.post("/policy-packages", createPolicyPackageHandler)
epxertRouter.delete("/policy-packages/:id", deletePolicyPackageHandler)

epxertRouter.get("/claims/:id", getClaimInfoHandler)
epxertRouter.get("/claims", getClaimsPaginatedHandler)
epxertRouter.put("/claims", updateClaimHandler)

export default epxertRouter;