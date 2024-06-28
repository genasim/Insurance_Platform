import { Router } from "express";
import getCoefficientsPaginatedHandler from "../controlers/coefficients/get-coefficients-paginated";
import deleteCoefficientHandler from "../controlers/coefficients/delete-coefficient";
import createUserHandler from "../controlers/coefficients/create-coefficient";
import getCoefficientHandler from "../controlers/coefficients/get-coefficient";
import updateCoefficientHandler from "../controlers/coefficients/update-coefficient";

const actuaryRouter = Router();

actuaryRouter.get("/coefficients", getCoefficientsPaginatedHandler);
actuaryRouter.get("/coefficients/:id", getCoefficientHandler);
actuaryRouter.post("/coefficients", createUserHandler);
actuaryRouter.patch("/coefficients/:id", updateCoefficientHandler);
actuaryRouter.delete("/coefficients/:id", deleteCoefficientHandler);


export default actuaryRouter;
