import authRouter from "./authRouter.js";
import { Router } from "express";

const router = Router();

router.use(router);

export default router;
