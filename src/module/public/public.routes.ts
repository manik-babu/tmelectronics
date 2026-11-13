import { Router } from "express";
import { publicController } from "./public.controller";
import validateRequest from "../../middleware/validateRequest";
import { GuestCartsSchema, OrderSchema } from "./public.validation";


// /api/v1/public
const router = Router();

router.get("/categories", publicController.gestAllCategories);
router.get("/brands", publicController.getAllBrands);
router.get("/offers", publicController.getAllOffers);

// Cards
router.post("/carts", validateRequest(GuestCartsSchema), publicController.getGuestCartsDetails);
router.post("/orders", validateRequest(OrderSchema), publicController.placeOrder);

export const publicRouter = router;