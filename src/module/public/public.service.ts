import { OrderStatus } from "../../../generated/prisma/client";
import AppError from "../../helper/appError";
import { prisma } from "../../lib/prisma";
import { nanoId } from "../../utils/nanoId";
import { OrderDetails, OrderProduct, OrderProductDetails } from "./public.interface";

const getAllCategories = async () => {
    const categories = await prisma.category.findMany({
        select: {
            name: true,
        },
    });
    const categoriesFormat = categories.map((category) => category.name);
    return categoriesFormat;
}
const getAllBrands = async () => {
    const brands = await prisma.brand.findMany({
        select: {
            name: true,
        },
    });
    const brandsFormat = brands.map((brand) => brand.name);
    return brandsFormat;
}
const getAllOffers = async () => {
    const offers = await prisma.offer.findMany({
        select: {
            name: true,
        },
    });
    const offersFormat = offers.map((offer) => offer.name);
    return offersFormat;
}
const getCartsProductById = async (productId: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        },
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
    });
    return product;
}
const getOrderProductById = async ({ productId, colorId, quantity }: OrderProduct) => {
    const [product, color] = await Promise.all([
        prisma.product.findUnique({
            where: {
                id: productId
            },
            select: {
                id: true,
                sku: true,
                title: true,
                price: true,
                discounted_price: true,
            }
        }),
        prisma.color.findUnique({
            where: {
                id: colorId,
                productId: productId
            },
            select: {
                id: true,
                name: true,
                stock: true,
            }
        })]);
    if (!product) {
        throw new AppError(404, "Selected product no longer available");
    }
    if (!color) {
        throw new AppError(404, `Color not available for ${product.title}`);
    }
    if (color.stock < quantity) {
        throw new AppError(400, `Only ${color.stock} items available for ${product.title} in ${color.name}`);
    }
    return {
        product: {
            id: product.id,
            sku: product.sku,
            title: product.title,
            price: Number(product.discounted_price ?? product.price)
        },
        color,
        quantity,
    }
}
const productAvailabilityCheck = async (products: OrderProduct[]) => {
    const quantitiesByColor = new Map<string, number>();
    for (const item of products) {
        quantitiesByColor.set(
            item.colorId,
            (quantitiesByColor.get(item.colorId) ?? 0) + item.quantity,
        );
    }
    for (const [colorId, quantity] of quantitiesByColor) {
        const color = await prisma.color.findUnique({
            where: {
                id: colorId,
            },
            select: {
                name: true,
                stock: true,
                product: {
                    select: {
                        title: true,
                    }
                }
            },
        });
        if (!color) {
            throw new AppError(404, `Color with ID ${colorId} not found`);
        }
        if (color.stock < quantity) {
            throw new AppError(400, `Only ${color.stock} items available for color ${color.name} in ${color.product.title}`);
        }
    }
    return quantitiesByColor;
}
const placeOrder = async (details: OrderDetails, products: OrderProductDetails[], totalAmount: number, quantitiesByColor: Map<string, number>) => {
    return prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
            data: {
                orderCode: `ORD-${nanoId()}`,
                name: details.name,
                phone: details.phone,
                address: details.address,
                userId: details.userId,
                note: details.note,
                totalAmount,
            },
        });

        await tx.orderItem.createMany({
            data: products.map((item) => ({
                orderId: newOrder.id,
                productId: item.product.id,
                productSku: item.product.sku,
                productTitle: item.product.title,
                colorId: item.color.id,
                quantity: item.quantity,
                price: item.product.price,
            })),
        });
        for (const [colorId, quantity] of quantitiesByColor) {
            await tx.color.update({
                where: {
                    id: colorId,
                },
                data: {
                    stock: {
                        decrement: quantity,
                    },
                },
            });
        }

        return newOrder;
    });
}
const cancelOrder = async (orderId: string, userId: string | null) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        select: {
            id: true,
            userId: true,
            status: true,
        },
    });

    if (!order) {
        throw new AppError(404, "Order not found");
    }

    if (order.userId && order.userId !== userId) {
        throw new AppError(403, "You are not authorized to cancel this order");
    }

    if (order.status === OrderStatus.CANCELLED) {
        throw new AppError(400, "Order is already canceled");
    }

    await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status: OrderStatus.CANCELLED,
        },
    });
}

export const publicService = {
    getAllCategories,
    getAllBrands,
    getAllOffers,
    getCartsProductById,
    getOrderProductById,
    placeOrder,
    productAvailabilityCheck,
    cancelOrder,
}