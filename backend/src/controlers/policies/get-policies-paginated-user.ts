import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import policyModel from "../../models/policies.model";

const getPoliciesPaginatedHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let { page, size } = req.query;
  page = page === "" || !page ? "1" : page;
  size = page === "" || !size ? "10" : size;

  if (
    !Number.isInteger(+page) ||
    !Number.isInteger(+size) ||
    +page <= 0 ||
    +size <= 0
  ) {
    res.status(400).json({ message: "Invalid page or size info" });
    return;
  }
  const clientId: string = (req.user as any)._id;

  try {
    const policies = await policyModel.aggregate([
      {
        $match: {
          holderId: new mongoose.Types.ObjectId(clientId),
        },
      },
      { $skip: (+page - 1) * +size },
      { $limit: +size },
    ]);
    res.status(200).json(policies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getPoliciesPaginatedHandler;
