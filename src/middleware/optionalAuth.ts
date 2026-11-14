import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            req.user = null as any; // No token provided, user is not authenticated
            next();
        }
        const decodedToken = jwt.verify(token, env.JWT_SECRET as string);
        if (!(decodedToken && typeof decodedToken === "object" && "role" in decodedToken)) {
            req.user = null as any; // No token provided, user is not authenticated
            next();
        }

        req.user = decodedToken as any;
        next();

    } catch (error) {
        console.error("Authorization error:", error);
        next(error);
    }
};
