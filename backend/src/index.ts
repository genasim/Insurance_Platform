import * as express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "text/html");
  res.send("<h1>Hello from ExpressJS!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
