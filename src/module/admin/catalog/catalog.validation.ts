import * as z from "zod";

export const addBrandSchema = z.object({
    name: z.string().min(1, "Brand name is required"),
});