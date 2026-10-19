import { Router } from "express";
import { authRouter } from "../module/auth/auth.routes";
import { adminProductRouter } from "../module/admin/product/product.routes";
import { catalogRouter } from "../module/admin/catalog/catalog.routes";
import { auth } from "../middleware/auth";
import { UserRole } from "../@types/userRole";
import { publicRouter } from "../module/public/public.routes";
import { productRouter } from "../module/product/product.routes";
import { cartRouter } from "../module/cart/cart.routes";


const router = Router();
router.use("/auth", authRouter);
router.use("/admin/products", auth(UserRole.ADMIN), adminProductRouter);
router.use("/admin/catalog", auth(UserRole.ADMIN), catalogRouter);
router.use("/public", publicRouter);
router.use("/products", productRouter);
router.use("/carts", auth(UserRole.USER), cartRouter);
export const apiRouter = router;