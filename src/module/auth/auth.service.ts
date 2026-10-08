import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { SignupRequest } from "./auth.interfaces"
import AppError from "../../helper/appError"

const signup = async (userData: SignupRequest) => {
    // Implementation for signing up a new user
    const created = await prisma.user.create({
        data: {
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            password: userData.password,
        },
    })
    return created
}
const isUserExists = async (phone: string, email: string) => {
    const user = await prisma.user.count({
        where: {
            OR: [
                { phone: phone },
                { email: email },
            ],
        },
    })
    return user > 0
}
const login = async (loginData: { phone: string; password: string }) => {
    // Implementation for logging in a user
    const user = await prisma.user.findUnique({
        where: {
            phone: loginData.phone,
        }
    })
    if (!user) {
        throw new AppError(400, "Phone number or password is incorrect")
    }
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password)
    if (!isPasswordValid) {
        throw new AppError(400, "Phone number or password is incorrect")
    }
    return user
}

export const AuthService = {
    signup,
    login,
    isUserExists
}