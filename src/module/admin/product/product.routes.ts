import { Router } from "express";
import { upload } from "../../../config/cloudinary";
import { productController } from "./product.controller";

// /api/v1/admin/product
const router = Router();
router.post("/", upload.array("images", 5), productController.addProduct);

export const adminProductRouter = router;