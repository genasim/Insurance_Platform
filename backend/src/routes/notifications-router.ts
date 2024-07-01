import { Router } from "express";
import getNotificationsPaginated from "../controlers/notifications/get-notifications-paginated";

const notificationRouter = Router();

notificationRouter.get("/", getNotificationsPaginated);

export default notificationRouter;
