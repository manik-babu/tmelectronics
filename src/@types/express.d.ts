import { Request } from "express";
import { LoggedInUser } from "./loggedInUser";
declare global {
    namespace Express {
        interface Request {
            user?: LoggedInUser;
        }
    }
}