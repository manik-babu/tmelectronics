import { prisma } from "../../lib/prisma"

const getOrders = async (userId: string) => {
    const orders = await prisma.order.findMany({
        where: {
            userId
        }
    })
    return orders;
}

export const userService = {
    getOrders
}