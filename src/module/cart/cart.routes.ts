import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { addToCartSchema } from "./cart.validation";
import { cartController } from "./cart.controller";

// api/v1/carts
const router = Router();
router.post("/", validateRequest(addToCartSchema), cartController.addCart);
router.get("/", cartController.getCartByUserId);
router.delete("/:id", cartController.deleteCart);
export const cartRouter = router;