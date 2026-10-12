import { Router } from "express";
import { productController } from "./product.controller";

// /api/v1/products
const router = Router();

router.get("/", productController.getProducts);

export const productRouter = router;