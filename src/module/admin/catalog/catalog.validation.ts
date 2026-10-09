import * as z from "zod";

export const addBrandSchema = z.object({
    name: z.string().min(1, "Brand name is required"),
});
export const addCategorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
});
export const addOfferSchema = z.object({
    name: z.string().min(1, "Offer name is required"),
    expirationDate: z.string().refine((date) => new Date(date) > new Date(), {
        message: "Expiration date must be in the future",
    }),
});