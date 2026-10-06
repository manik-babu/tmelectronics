import { prisma } from "../../lib/prisma"
import { SignupRequest } from "./auth.interfaces"

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

export const AuthService = {
    signup
}