import { Router } from "express";
import createClaimHandler from "../controlers/client/create-claim";

const clientsRouter = Router();

clientsRouter.post("/claims", createClaimHandler);

export default clientsRouter;
