import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      console.log("error", error);

      res.status(401).json({ message: "Token expired or invalid" });
      return;
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default authenticate;
