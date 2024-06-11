import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";
import authRouter from "./routes/auth-router";
import connectDB from "./db/mongo-connect";
import logger from "./middleware/logger";
import passport from "passport";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(passport.initialize())

app.use("/api/auth", authRouter);

app.on("error", (error) => {
  console.error(error);
});

app.use((err: Error, req: Request, res: Response, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running at: http://localhost:${PORT}`);
});
