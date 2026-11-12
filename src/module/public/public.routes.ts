import { Router } from "express";
import { publicController } from "./public.controller";
import validateRequest from "../../middleware/validateRequest";
import { GuestCartsSchema } from "./public.validation";


// /api/v1/public
const router = Router();

router.get("/categories", publicController.gestAllCategories);
router.get("/brands", publicController.getAllBrands);
router.get("/offers", publicController.getAllOffers);

// Cards
router.post("/carts", validateRequest(GuestCartsSchema), publicController.getGuestCartsDetails);
export const publicRouter = router;