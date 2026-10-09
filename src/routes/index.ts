import { Router } from "express";
import { authRouter } from "../module/auth/auth.routes";
import { adminProductRouter } from "../module/admin/product/product.routes";
import { catalogRouter } from "../module/admin/catalog/catalog.routes";
import { auth } from "../middleware/auth";
import { UserRole } from "../@types/userRole";


const router = Router();
router.use("/auth", authRouter);
router.use("/admin/product", auth(UserRole.ADMIN), adminProductRouter);
router.use("/admin/catalog", auth(UserRole.ADMIN), catalogRouter);
router.use("/public", catalogRouter);
export const apiRouter = router;