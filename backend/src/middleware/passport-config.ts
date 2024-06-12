import passportConfig from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import usersModel from "../models/users.model";
import fs from "fs";
import path from "path";

const publicKey = fs.readFileSync(
  path.join(__dirname, "..", "..", "creds", "public.pem"),
  "utf8"
);

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ["RS256"],
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
