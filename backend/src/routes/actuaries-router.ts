import { Router } from "express";
import getCoefficientsPaginatedHandler from "../controlers/coefficients/get-coefficients-paginated";
import deleteCoefficientHandler from "../controlers/coefficients/delete-coefficient";
import createUserHandler from "../controlers/coefficients/create-coefficient";

const actuaryRouter = Router();

actuaryRouter.get("/coefficients", getCoefficientsPaginatedHandler);
actuaryRouter.post("/coefficients", createUserHandler);
actuaryRouter.delete("/coefficients/:id", deleteCoefficientHandler);


export default actuaryRouter;
