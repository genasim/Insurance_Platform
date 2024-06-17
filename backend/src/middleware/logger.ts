import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const consoleEntry = `${new Date().toISOString()} ${req.method} ${req.ip} ${req.originalUrl}`;
  console.log(consoleEntry);

  next();
};

export default logger;
