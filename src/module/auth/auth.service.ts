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
const isUserExists = async (phone: string) => {
    const user = await prisma.user.count({
        where: {
            phone: phone,
        },
    })
    return user > 0
}

export const AuthService = {
    signup,
    isUserExists
}