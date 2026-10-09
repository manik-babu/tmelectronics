import { prisma } from "../../lib/prisma";

const getAllCategories = async () => {
    const categories = await prisma.category.findMany();
    return categories;
}
const getAllBrands = async () => {
    const brands = await prisma.brand.findMany();
    return brands;
}
const getAllOffers = async () => {
    const offers = await prisma.offer.findMany();
    return offers;
}

export const publicService = {
    getAllCategories,
    getAllBrands,
    getAllOffers,
}