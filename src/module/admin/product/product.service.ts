import { prisma } from "../../../lib/prisma";
import { nanoId } from "../../../utils/nanoId";
import { ProductSchema } from "./product.interface";



const addProduct = async ({ data, images }: ProductSchema) => {
    const product = await prisma.product.create({
        data: {
            sku: nanoId(),
            title: data.title,
            description: data.description,
            price: data.price,
            brand_name: data.brand_name,
            category_name: data.category_name,
            colors: {
                create: data.colors
            },
            productImages: {
                create: images
            },
        },
    });
    return product;
}

export const productService = {
    addProduct,
}