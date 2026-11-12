import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { publicService } from "./public.service";
import { GuestCartItem } from "./public.interface";

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
const getGuestCartsDetails = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const productDetails = await Promise.all(data.map(async (item: GuestCartItem) => {
        const product = await publicService.getCartsProductById(item.productId);
        if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
        }
        const color = product.colors.find(c => c.id === item.colorId);
        if (!color) {
            throw new Error(`Color with ID ${item.colorId} not found for product ${item.productId}`);
        }
        return {
            id: item.cartId,
            quantity: item.quantity,
            color: {
                id: color.id,
                name: color.name,
            },
            product: {
                id: product.id,
                title: product.title,
                price: product.price,
                discounted_price: product.discounted_price,
                image: product.productImages[0]?.url || null,
                colors: product.colors,
            }
        };
    }));
    sendResponse(res, {
        code: 200,
        ok: true,
        message: "Product fetched successfully",
        data: productDetails,
    });
});

export const publicController = {
    gestAllCategories,
    getAllBrands,
    getAllOffers,
    getGuestCartsDetails,
}