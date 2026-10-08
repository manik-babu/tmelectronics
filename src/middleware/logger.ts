import { NextFunction, Request, Response } from "express";

const defaultLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log({
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        query: req.query,
        params: req.params,
    })
    next();
};

export default defaultLogger;