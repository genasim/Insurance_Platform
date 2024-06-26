import { Request, RequestHandler, Response } from "express";
import policyTemplatesModel from "../../models/policy-templates.model";

const getPolicyTemplatesHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const templates = await policyTemplatesModel.find();
    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getPolicyTemplatesHandler;
