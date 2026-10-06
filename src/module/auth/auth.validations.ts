import * as z from "zod";

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});