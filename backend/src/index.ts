import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import connectDB from "./db/mongo-connect";
import authenticate from "./middleware/authenticate";
import authorize from "./middleware/authorize";
import logger from "./middleware/logger";
import passportConfig from "./middleware/passport-config";
import authRouter from "./routes/auth-router";
import adminRouter from "./routes/admin-router";
import clientsRouter from "./routes/clients-router";
import Right from "./types/Right";
import epxertRouter from "./routes/expert-router";
import actuariesRouter from "./routes/actuaries-router";

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.use(logger);
app.use(passportConfig.initialize());

app.use("/api/auth", authRouter);

app.use(authenticate);
app.use("/api/admin", authorize([Right.ADMIN]), adminRouter);
app.use("/api/clients", authorize([Right.CLIENT, Right.ADMIN]), clientsRouter);
app.use("/api/backoffice", authorize([Right.EXPERT, Right.ADMIN]), epxertRouter);
app.use("/api/actuaries", authorize([Right.ACTUARY, Right.ADMIN]), actuariesRouter);

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
