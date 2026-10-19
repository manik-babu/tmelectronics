import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { cartService } from "./cart.service";

const addCart = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const cart = await cartService.addCart(req.body, userId);
    sendResponse(res, {
        code: 201,
        ok: true,
        message: "Product added to cart successfully",
        data: cart
    })
})
const deleteCart = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const cartId = req.params.id as string;
    const cart = await cartService.deleteCart(cartId, userId);
    sendResponse(res, {
        code: 200,
        ok: true,
        message: "Product removed from cart successfully",
        data: cart
    })
});
const getCartByUserId = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const cart = await cartService.getCartByUserId(userId);
    sendResponse(res, {
        code: 200,
        ok: true,
        message: "Cart retrieved successfully",
        data: cart
    })
})

export const cartController = {
    addCart,
    deleteCart,
    getCartByUserId
}