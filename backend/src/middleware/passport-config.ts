import passportConfig from "passport";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";
import usersModel from "../models/users.model";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true,
};

passportConfig.use(
  new JwtStrategy(options, async (req, payload, done) => {
    try {
      const user = await usersModel.findById(payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return done(null, false, { message: "JWT token has expired" });
      }
      return done(error, false);
    }
  })
);

export default passportConfig;
