import {Router} from "express";
import createUserHandler from "../controlers/users/create-user";
import deleteUserHandler from "../controlers/users/delete-user";
import getUsersPaginatedHandler from "../controlers/users/get-users-paginated";
import getUserHandler from "../controlers/users/get-user";
import updateUserHandler from "../controlers/users/update-user";
import getClaimDocumentsHandler from "../controlers/claim-documents/get-claim-documents-paginated";

const adminRouter = Router()

adminRouter.get("/users/", getUsersPaginatedHandler)
adminRouter.get("/users/:id", getUserHandler)
adminRouter.post("/users/", createUserHandler)
adminRouter.patch("/users/:id", updateUserHandler)
adminRouter.delete("/users/:id", deleteUserHandler)

adminRouter.get("/claim-documents/", getClaimDocumentsHandler)


export default adminRouter