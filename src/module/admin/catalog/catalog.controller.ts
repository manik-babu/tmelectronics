import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { CatalogService } from "./catalog.service";

const addBrand = catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const brand = await CatalogService.addBrand(name);
    sendResponse(res, {
        code: 201,
        ok: true,
        message: "Brand added successfully",
        data: brand,
    });
});
const addCategory = catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await CatalogService.addCategory(name);
    sendResponse(res, {
        code: 201,
        ok: true,
        message: "Category added successfully",
        data: category,
    });
});

export const CatalogController = {
    addBrand,
    addCategory
}