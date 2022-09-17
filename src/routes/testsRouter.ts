import { Router } from "express";
import { createTest, getTestsByTerms, getTestsByTeachers } from "../controllers/testsController";
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
testsRouter.get("/testes/disciplinas", authMiddleware, getTestsByTerms);
testsRouter.get("/testes/instrutores", authMiddleware, getTestsByTeachers);

export default testsRouter;
