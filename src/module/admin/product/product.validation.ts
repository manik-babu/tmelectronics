import * as z from "zod";

export const productSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    price: z.number().positive("Price must be a positive number"),
    brand_name: z.string().min(1, "Brand name is required"),
    category_name: z.string().min(1, "Category name is required"),
    colors: z.array(z.object({
        name: z.string().min(1, "Color name is required"),
        stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
    })).min(1, "At least one color is required"),
});