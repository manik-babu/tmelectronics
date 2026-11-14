import * as z from "zod";
import { OrderStatus } from "../../../generated/prisma/enums";

export const GuestCartsSchema = z.array(z.object({
    productId: z.string().nonempty("Product ID is required"),
    colorId: z.string().nonempty("Color ID is required"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    cartId: z.string().nonempty("Cart ID is required"),
}));
export const OrderSchema = z.object({
    details: z.object({
        name: z.string().nonempty("Name is required"),
        phone: z.string().nonempty("Phone number is required"),
        address: z.string().nonempty("Address is required"),
        userId: z.string().nullable(),
        note: z.string().nullable(),
    }),
    products: z.array(z.object({
        productId: z.string().nonempty("Product ID is required"),
        colorId: z.string().nonempty("Color ID is required"),
        quantity: z.number().int().positive("Quantity must be a positive integer"),
    })),
})