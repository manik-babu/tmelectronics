import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import bcrypt from "bcryptjs";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";


const signup = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const hash = await bcrypt.hash(data.password, 10); // Hash the password with a salt round of 10

    data.password = hash; // Replace the plain password with the hashed password
    const created = await AuthService.signup(data); // Call the signup service with the hashed password

    sendResponse(res, {
        code: 201,
        ok: true,
        message: "User created successfully",
        data: created,
    })
});

export const AuthController = {
    signup
}