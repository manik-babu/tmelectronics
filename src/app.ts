import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes";
import globalErrorHandler from "./middleware/globalError";

const app = express();

dotenv.config({
    path: path.join(process.cwd(), ".env")
});
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", apiRouter);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use(globalErrorHandler);

export default app;