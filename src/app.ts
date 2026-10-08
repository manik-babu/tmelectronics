import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes";
import globalErrorHandler from "./middleware/globalError";
import notFoundHandler from "./middleware/notFound";
import defaultLogger from "./middleware/logger";

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


app.use("/api/v1", defaultLogger, apiRouter);
app.get("/", (req, res) => {
    res.status(200).json({
        ok: true,
        message: "Welcome to the Electronics Inventory Management System API",
        data: null
    });
});
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;