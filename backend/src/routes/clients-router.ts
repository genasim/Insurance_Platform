import { Router } from "express";
import createClaimHandler from "../controlers/claims/create-claim";
import getClaimsPaginatedHandler from "../controlers/claims/get-claims-paginated";
import createPolicyHandler from "../controlers/policies/create-policy";

const clientsRouter = Router();

clientsRouter.get("/claims", getClaimsPaginatedHandler)
clientsRouter.post("/claims", createClaimHandler);

clientsRouter.post("/policies", createPolicyHandler)


export default clientsRouter;
