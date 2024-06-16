import { Router } from "express";
import createClaimHandler from "../controlers/client/create-claim";
import getClaimsPaginatedHandler from "../controlers/client/get-claims-paginated";

const clientsRouter = Router();

clientsRouter.get("/claims", getClaimsPaginatedHandler)
clientsRouter.post("/claims", createClaimHandler);

export default clientsRouter;
