import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { authSchema } from "../schemas/registerSchema";
import { userSchema } from "../schemas/userSchema";

const authRouter = Router();

authRouter.post("/cadastro", validateSchemaMiddleware(authSchema), register);
authRouter.post("/login", validateSchemaMiddleware(userSchema), login);

export default authRouter;
