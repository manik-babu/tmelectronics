import { Router } from "express";
import { publicController } from "./public.controller";
import validateRequest from "../../middleware/validateRequest";
import { GuestCartsSchema, OrderSchema } from "./public.validation";
import { optionalAuth } from "../../middleware/optionalAuth";


// /api/v1/public
const router = Router();

router.get("/categories", publicController.gestAllCategories);
router.get("/brands", publicController.getAllBrands);
router.get("/offers", publicController.getAllOffers);

// Cards
router.post("/carts", validateRequest(GuestCartsSchema), publicController.getGuestCartsDetails);

// Orders
router.post("/orders", validateRequest(OrderSchema), publicController.placeOrder);
router.patch("/orders/:orderId", optionalAuth, publicController.cancelOrder);
export const publicRouter = router;