import * as z from "zod";

export const GuestCartsSchema = z.array(z.object({
    productId: z.string().nonempty("Product ID is required"),
    colorId: z.string().nonempty("Color ID is required"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    cartId: z.string().nonempty("Cart ID is required"),
}));