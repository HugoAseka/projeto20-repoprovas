import { Router } from "express";
import { register } from "../controllers/authController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { authSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/cadastrar", validateSchemaMiddleware(authSchema), register);

export default authRouter;
