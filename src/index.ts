import router from "./routes/indexRouter.js";
import errorsHandlerMiddleware from "./middlewares/errorsHandlerMiddleware.js";
import express, { json } from "express";
import "express-async-errors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(json());
app.use(router);
app.use(errorsHandlerMiddleware);

const port = Number(process.env.PORT) || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));
