import { Router } from "express";
import { userController } from "./user.controller";

// /api/v1/users
const router = Router();

router.get("/orders", userController.getUserOrders);

export const userRouter = router;