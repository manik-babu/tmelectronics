import AppError from "../../../helper/appError";
import { prisma } from "../../../lib/prisma";
import { AddOfferInput } from "./catalog.interface";



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
const addOffer = async (data: AddOfferInput) => {
    const isExists = await prisma.offer.count({
        where: {
            name: data.name
        }
    }) > 0;
    if (isExists) {
        throw new AppError(400, "Offer already exists");
    }
    const offer = await prisma.offer.create({
        data: {
            name: data.name,
            expirationDate: new Date(data.expirationDate)
        }
    });
    return offer;
};

export const CatalogService = {
    addBrand,
    addCategory,
    addOffer,
}