import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { addToCartSchema, updateCartColorSchema, updateCartQuantitySchema } from "./cart.validation";
import { cartController } from "./cart.controller";

// api/v1/carts
const router = Router();
router.post("/", validateRequest(addToCartSchema), cartController.addCart);
router.get("/", cartController.getCartByUserId);
router.delete("/:id", cartController.deleteCart);
router.patch("/quantity/:id", validateRequest(updateCartQuantitySchema), cartController.updateCartQuantity);
router.patch("/color/:id", validateRequest(updateCartColorSchema), cartController.updateCartColor);
export const cartRouter = router;