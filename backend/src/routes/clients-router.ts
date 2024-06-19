import { Router } from "express";
import createClaimHandler from "../controlers/claims/create-claim";
import getClaimsPaginatedHandler from "../controlers/claims/get-claims-paginated";

const clientsRouter = Router();

clientsRouter.get("/claims", getClaimsPaginatedHandler)
clientsRouter.post("/claims", createClaimHandler);

export default clientsRouter;
