import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { loginSchema, signupSchema } from "./auth.validations";

const router = Router();
router.post("/signup", validateRequest(signupSchema), AuthController.signup);
router.post("/login", validateRequest(loginSchema), AuthController.login);
export const authRouter = router;