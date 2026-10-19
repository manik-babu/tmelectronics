import * as z from "zod";

export const addToCartSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    colorId: z.string().min(1, "Color ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
});