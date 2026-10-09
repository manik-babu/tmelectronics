import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { publicService } from "./public.service";

const gestAllCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await publicService.getAllCategories();
    sendResponse(res, {
        code: 200,
        ok: true,
        message: "Categories fetched successfully",
        data: categories,
    });
});
const getAllBrands = catchAsync(async (req: Request, res: Response) => {
    const brands = await publicService.getAllBrands();
    sendResponse(res, {
        code: 200,
        ok: true,
        message: "Brands fetched successfully",
        data: brands,
    });
});
const getAllOffers = catchAsync(async (req: Request, res: Response) => {
    const offers = await publicService.getAllOffers();
    sendResponse(res, {
        code: 200,
        ok: true,
        message: "Offers fetched successfully",
        data: offers,
    });
});

export const publicController = {
    gestAllCategories,
    getAllBrands,
    getAllOffers,
}