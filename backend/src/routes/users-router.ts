import { Router } from "express";
import createUserHandler from "../controlers/users/create-user";
import deleteUserHandler from "../controlers/users/delete-user";
import getUsersPaginatedHandler from "../controlers/users/get-users-paginated";
import getUserHandler from "../controlers/users/get-user";

const usersRouter = Router()

usersRouter.get("/", getUsersPaginatedHandler)
usersRouter.get("/:id", getUserHandler)
usersRouter.post("/", createUserHandler)
usersRouter.delete("/:id", deleteUserHandler)

export default usersRouter