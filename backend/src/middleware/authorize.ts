import { NextFunction, Request, Response } from "express";
import { Right } from "../models/users.model";

const checkRights = (required: Right[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const rights: Right[] = (req.user as any).rights;
    
    const hasAccess = required.every((right) =>
      rights.includes(right)
    );

    console.log(rights);
    if (!hasAccess) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

export default checkRights;
