import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { db } from "./models";

import userRoutes from "./routes/userRoutes";
import fileRoutes from "./routes/fileRoutes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
   origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
   res.status(404).end();
});

db.sync({ alter: false }).then(() => {
   console.info("connected to the database!");
});

app.listen(3001);
