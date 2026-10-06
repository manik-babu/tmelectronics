import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { signupSchema } from "./auth.validations";

const router = Router();
router.post("/signup", validateRequest(signupSchema), AuthController.signup);

export const authRouter = router;