import { Router } from "express";
import { createTest, getTestsByTerms } from "../controllers/testsController";
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
testsRouter.get("/testes", authMiddleware, getTestsByTerms);

export default testsRouter;
