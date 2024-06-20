import { Router } from "express";
import createUserHandler from "../controlers/users/create-user";
import deleteUserHandler from "../controlers/users/delete-user";
import getUsersPaginatedHandler from "../controlers/users/get-users-paginated";
import getUserHandler from "../controlers/users/get-user";

const adminRouter = Router()

adminRouter.get("/users/", getUsersPaginatedHandler)
adminRouter.get("/users/:id", getUserHandler)
adminRouter.post("/users/", createUserHandler)
adminRouter.delete("/users/:id", deleteUserHandler)


export default adminRouter