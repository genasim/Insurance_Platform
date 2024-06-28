import { Router } from "express";
import getCoefficientsPaginatedHandler from "../controlers/coefficients/get-coefficients-paginated";

const actuaryRouter = Router();

actuaryRouter.get("/coefficients", getCoefficientsPaginatedHandler)


export default actuaryRouter;
