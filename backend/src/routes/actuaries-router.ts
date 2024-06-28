import { Router } from "express";
import getCoefficientsPaginatedHandler from "../controlers/coefficients/get-coefficients-paginated";
import deleteCoefficientHandler from "../controlers/coefficients/delete-coefficient";

const actuaryRouter = Router();

actuaryRouter.get("/coefficients", getCoefficientsPaginatedHandler);
actuaryRouter.delete("/coefficients/:id", deleteCoefficientHandler);


export default actuaryRouter;
