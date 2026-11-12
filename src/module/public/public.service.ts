import { prisma } from "../../lib/prisma";

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

export const publicService = {
    getAllCategories,
    getAllBrands,
    getAllOffers,
    getCartsProductById,
}