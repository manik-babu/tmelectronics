import { Router } from "express";
import { authRouter } from "../module/auth/auth.routes";
import { adminProductRouter } from "../module/admin/product/product.routes";


const router = Router();
router.use("/auth", authRouter);
router.use("/admin/product", adminProductRouter);
export const apiRouter = router;