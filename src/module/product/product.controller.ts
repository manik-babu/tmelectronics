import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { productService } from "./product.service";
import { ProductFilter } from "./product.interface";
import sendResponse from "../../utils/sendResponse";

const getProducts = catchAsync(async (req: Request, res: Response) => {
    const filter = req.query as unknown as ProductFilter;
    const { products, meta } = await productService.getProducts(filter);
    sendResponse(res, {
        code: 200,
        ok: true,
        message: "Products fetched successfully",
        data: {
            products,
            meta,
        }
    });
});
const getProductById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await productService.getProductById(id as string);
    sendResponse(res, {
        code: 200,
        ok: true,
        message: "Product fetched successfully",
        data: product
    });
});

export const productController = {
    getProducts,
    getProductById,
};