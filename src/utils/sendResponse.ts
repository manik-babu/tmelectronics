import { Response } from "express";

const sendResponse = (res: Response, responseData: { code: number, ok: boolean, message: string, data?: any }) => {
    res.status(responseData.code).json(
        {
            ok: responseData.ok,
            message: responseData.message,
            data: responseData.data || null,
        },
    );
}

export default sendResponse;