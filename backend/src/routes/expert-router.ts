import { Router } from "express";
import createPolicyPackageHandler from "../controlers/policy-packages/create-policy-package";
import deletePolicyPackageHandler from "../controlers/policy-packages/delete-policy-package";
import getPolicyPackageHandler from "../controlers/policy-packages/get-policy-package-id";
import getClaimInfoHandler from "../controlers/claims/get-claim-info";
import getClaimsPaginatedHandler from "../controlers/claims/get-claims-paginated";
import updateClaimHandler from "../controlers/claims/update-claim";
import getPoliciesPaginated from "../controlers/policies-backoffice/get-policies-paginated";
import getPremiumPaymentsPaginated from "../controlers/premium-payments/get-premium-payments-paginated";
import getClaimPaymentsPaginated from "../controlers/claim-payments/get-claim-payments-paginated";
import createClaimPaymentHandler from "../controlers/claim-payments/create-claim-payment";

const epxertRouter = Router()

epxertRouter.get("/policy-packages/:id", getPolicyPackageHandler)
epxertRouter.post("/policy-packages", createPolicyPackageHandler)
epxertRouter.delete("/policy-packages/:id", deletePolicyPackageHandler)

epxertRouter.get("/claims/:id", getClaimInfoHandler)
epxertRouter.get("/claims", getClaimsPaginatedHandler)
epxertRouter.put("/claims", updateClaimHandler)

epxertRouter.get("/policies", getPoliciesPaginated)

epxertRouter.get("/premium-payments", getPremiumPaymentsPaginated)
epxertRouter.get("/claim-payments", getClaimPaymentsPaginated)
epxertRouter.post("/claim-payments", createClaimPaymentHandler)

export default epxertRouter;