import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number | string = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ code: 200, message: "success" });
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
