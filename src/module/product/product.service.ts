import { prisma } from "../../lib/prisma";
import { ProductFilter } from "./product.interface";


const getProducts = async (filter: ProductFilter) => {
    const { text, brand, category, price, offer, page } = filter;

    const products = await prisma.product.findMany({
        where: {
            AND: [
                text ? { title: { contains: text, mode: "insensitive" } } : {},
                brand ? { brand_name: { contains: brand, mode: "insensitive" } } : {},
                category ? { category_name: { contains: category, mode: "insensitive" } } : {},
                offer ? { offer_name: { contains: offer, mode: "insensitive" } } : {},
            ],
        },
        orderBy: price ? { price: price } : undefined,
        skip: page ? (page - 1) * 10 : 0,
        take: 10,
    });
    const meta = {
        currentPage: page || 1,
        total: products.length,
    };


    return { products, meta };
}

export const productService = {
    getProducts,
};