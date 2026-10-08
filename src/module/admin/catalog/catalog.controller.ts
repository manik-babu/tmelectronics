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

export const CatalogController = {
    addBrand
}