import AppError from "../../../helper/appError";
import { prisma } from "../../../lib/prisma";



const addBrand = async (name: string) => {
    const isExists = await prisma.brand.count({
        where: {
            name
        }
    }) > 0;
    if (isExists) {
        throw new AppError(400, "Brand already exists");
    }
    const brand = await prisma.brand.create({
        data: {
            name
        }
    });
    return brand;
};
const addCategory = async (name: string) => {
    const isExists = await prisma.category.count({
        where: {
            name
        }
    }) > 0;
    if (isExists) {
        throw new AppError(400, "Category already exists");
    }
    const category = await prisma.category.create({
        data: {
            name
        }
    });
    return category;
};

export const CatalogService = {
    addBrand,
    addCategory
}