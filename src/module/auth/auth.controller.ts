import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import bcrypt from "bcryptjs";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

const signup = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const isExists = await AuthService.isUserExists(data.phone, data.email);

    if (isExists) {
        return sendResponse(res, {
            code: 400,
            ok: false,
            message: "User already exists",
        });
    }
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
const login = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const user = await AuthService.login(data);

    const tokenData = {
        id: user.id,
        role: user.role,
    }
    const token = jwt.sign(tokenData, env.JWT_SECRET, {
        expiresIn: 30 * 24 * 60 * 60, // 30 days
    });

    sendResponse(res, {
        code: 200,
        ok: true,
        message: "User logged in successfully",
        data: {
            token,
            user: {
                name: user.name,
                phone: user.phone,
                role: user.role,
            }
        },
    });
});

export const AuthController = {
    signup,
    login
}