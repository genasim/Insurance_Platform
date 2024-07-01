import { Router } from "express";
import createClaimHandler from "../controlers/claims/create-claim";
import getUserClaimsPaginatedHandler from "../controlers/claims/get-user-claims-paginated";
import createPolicyHandler from "../controlers/policies/create-policy";
import getPolicyTypePackagesHandler from "../controlers/policy-packages/get-policy-type-packages";
import getPolicyTypeCoefficientsHandler from "../controlers/coefficients/get-policy-type-coefficients";
import getPoliciesPaginatedHandler from "../controlers/policies/get-policies-paginated-user";
import getPolicyHandler from "../controlers/policies/get-policy-id";

const clientsRouter = Router();

clientsRouter.get("/claims", getUserClaimsPaginatedHandler)
clientsRouter.post("/claims", createClaimHandler);

clientsRouter.get("/policies", getPoliciesPaginatedHandler)
clientsRouter.post("/policies", createPolicyHandler)
clientsRouter.get("/policies/:id", getPolicyHandler)
clientsRouter.get("/policies/:type/packages", getPolicyTypePackagesHandler)
clientsRouter.get("/policies/:type/coefficients", getPolicyTypeCoefficientsHandler)


export default clientsRouter;
