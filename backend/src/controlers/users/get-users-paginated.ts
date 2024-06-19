import { Request, RequestHandler, Response } from "express";
import usersModel from "../../models/users.model";

const getUsersPaginatedHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let { page, size } = req.query;
  page = page === "" || !page ? "1" : page;
  size = page === "" || !size ? "10" : size;

  if (isNaN(+page) || isNaN(+size)) {
    res.status(400).json({ message: "Invalid page or size info" });
    return;
  }

  try {
    const users = await usersModel.aggregate([
      { $skip: (+page - 1) * +size },
      { $limit: +size },
    ]);
    users.forEach((user) => {
      delete user.password;
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getUsersPaginatedHandler;
