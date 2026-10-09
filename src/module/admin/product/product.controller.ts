import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { uploadToCloudinary } from "../../../config/cloudinary";
import { productSchema } from "./product.validation";
import { productService } from "./product.service";

const addProduct = catchAsync(async (req: Request, res: Response) => {
    const { error, data } = productSchema.safeParse(JSON.parse(req.body.data));
    if (!data || error) {
        return sendResponse(res, {
            code: 400,
            ok: false,
            message: "Required fields are missing or invalid",
            data: error,
        });
    }

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
        return sendResponse(res, {
            code: 400,
            ok: false,
            message: "No images uploaded",
        });
    }

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(files.map(async (file) => {
        const image = await uploadToCloudinary({
            file: file,
            folder: "products",
            resource_type: "image",
        });
        return {
            url: image.secure_url
        };
    }));
    const uploaded = await productService.addProduct({
        data,
        images: uploadedImages,
    });

    sendResponse(res, {
        code: 201,
        ok: true,
        message: "Product added successfully",
        data: uploaded,
    });
});

export const productController = {
    addProduct,
}