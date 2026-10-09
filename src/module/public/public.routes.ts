import { Router } from "express";
import { publicController } from "./public.controller";


// /api/v1/public
const router = Router();

router.get("/categories", publicController.gestAllCategories);
router.get("/brands", publicController.getAllBrands);
router.get("/offers", publicController.getAllOffers);

export const publicRouter = router;