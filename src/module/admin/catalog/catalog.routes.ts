import { Router } from "express";
import { CatalogController } from "./catalog.controller";
import { addBrandSchema, addCategorySchema } from "./catalog.validation";
import validateRequest from "../../../middleware/validateRequest";

// /api/v1/admin/catalog
const router = Router();

router.post("/brands", validateRequest(addBrandSchema), CatalogController.addBrand);
router.post("/categories", validateRequest(addCategorySchema), CatalogController.addCategory);

export const catalogRouter = router;