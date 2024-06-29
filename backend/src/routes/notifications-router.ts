import { Router } from "express";
import getCoefficientsPaginatedHandler from "../controlers/coefficients/get-coefficients-paginated";
import deleteCoefficientHandler from "../controlers/coefficients/delete-coefficient";
import createUserHandler from "../controlers/coefficients/create-coefficient";
import getCoefficientHandler from "../controlers/coefficients/get-coefficient";
import updateCoefficientHandler from "../controlers/coefficients/update-coefficient";
import getNotificationsPaginated from "../controlers/notifications/get-notifications-paginated";

const notificationRouter = Router();

notificationRouter.get("/", getNotificationsPaginated);

export default notificationRouter;
