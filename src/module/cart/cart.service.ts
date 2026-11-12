import AppError from "../../helper/appError";
import { prisma } from "../../lib/prisma";
import { CartItem } from "./cart.interface"

const addCart = async (data: CartItem, userId: string) => {
    const { productId, colorId, quantity } = data;
    const cart = await prisma.cart.create({
        data: {
            productId,
            colorId,
            quantity,
            userId
        }
    })
    return cart;
}
const deleteCart = async (cartId: string, userId: string) => {
    const cart = await prisma.cart.count({
        where: {
            id: cartId,
            userId
        }
    })
    if (cart === 0) {
        throw new AppError(404, "Cart not found or you are not authorized to delete this cart");
    }
    await prisma.cart.delete({
        where: {
            id: cartId
        }
    });
    return null;
}
const getCartByUserId = async (userId: string) => {
    const cart = await prisma.cart.findMany({
        where: {
            userId
        },
        omit: {
            updatedAt: true,
            createdAt: true,
            userId: true,
            productId: true,
            colorId: true
        },
        include: {
            product: {
                select: {
                    id: true,
                    title: true,
                    price: true,
                    discounted_price: true,
                    colors: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    productImages: {
                        select: {
                            url: true,
                        },
                        take: 1
                    }
                }
            },
            color: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });
    const formattedCart = cart.map(item => {
        return {
            id: item.id,
            quantity: item.quantity,
            color: {
                id: item.color.id,
                name: item.color.name,
            },
            product: {
                id: item.product.id,
                title: item.product.title,
                price: item.product.price,
                discounted_price: item.product.discounted_price,
                image: item.product.productImages[0]?.url || null,
                colors: item.product.colors,
            }
        }
    })
    return formattedCart;
}
const updateCartQuantity = async (cartId: string, userId: string, quantity: number) => {
    const cart = await prisma.cart.count({
        where: {
            id: cartId,
            userId
        }
    })
    if (cart === 0) {
        throw new AppError(404, "Cart not found or you are not authorized to update this cart");
    }
    const updatedCart = await prisma.cart.update({
        where: {
            id: cartId
        },
        data: {
            quantity
        }
    });
    return updatedCart;
}
const updateCartColor = async (cartId: string, userId: string, colorId: string) => {
    const cart = await prisma.cart.count({
        where: {
            id: cartId,
            userId
        }
    })
    if (cart === 0) {
        throw new AppError(404, "Cart not found or you are not authorized to update this cart");
    }
    const updatedCart = await prisma.cart.update({
        where: {
            id: cartId
        },
        data: {
            colorId
        }
    });
    return updatedCart;
}

export const cartService = {
    addCart,
    deleteCart,
    getCartByUserId,
    updateCartQuantity,
    updateCartColor,
}