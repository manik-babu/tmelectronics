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

export const CatalogService = {
    addBrand
}