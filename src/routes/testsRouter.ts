import { Router } from "express";
import { createTest } from "../controllers/testsController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { testSchema } from "../schemas/testsSchema";


const testsRouter = Router();

testsRouter.post("/tests",validateSchemaMiddleware(testSchema),createTest);



export default testsRouter;