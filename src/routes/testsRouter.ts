import { Router } from "express";
import { createTest } from "../controllers/testsController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { authMiddleware } from "../middlewares/tokenValidation";
import { testSchema } from "../schemas/testsSchema";

const testsRouter = Router();

testsRouter.post(
  "/testes",
  validateSchemaMiddleware(testSchema),
  authMiddleware,
  createTest
);

export default testsRouter;
