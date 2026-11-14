import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const getUserOrders = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const orders = await userService.getOrders(userId);

    sendResponse(res, {
        code: 200,
        ok: true,
        message: "User orders fetched successfully",
        data: orders,
    });
});

export const userController = {
    getUserOrders
};