import { Router } from "express";
import { CatalogController } from "./catalog.controller";
import { addBrandSchema, addCategorySchema, addOfferSchema } from "./catalog.validation";
import validateRequest from "../../../middleware/validateRequest";

// /api/v1/admin/catalog
const router = Router();

router.post("/brands", validateRequest(addBrandSchema), CatalogController.addBrand);
router.post("/categories", validateRequest(addCategorySchema), CatalogController.addCategory);
router.post("/offers", validateRequest(addOfferSchema), CatalogController.addOffer);
export const catalogRouter = router;