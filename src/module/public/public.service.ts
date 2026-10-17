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

export const publicService = {
    getAllCategories,
    getAllBrands,
    getAllOffers,
}