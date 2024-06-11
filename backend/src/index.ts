import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import { Request, Response } from "express";
import authRouter from "./routes/auth-router";
import connectDB from "./db/mongo-connect";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "text/html");
  res.send("<h1>Hello from ExpressJS!</h1>");
});

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
