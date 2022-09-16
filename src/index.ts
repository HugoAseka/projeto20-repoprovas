import express, { json } from "express";
import "express-async-errors";



import errorsHandlerMiddleware from "./middlewares/errorsHandlerMiddleware";
import router from "./routes/indexRouter";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

app.use(router);
app.use(errorsHandlerMiddleware);



export default app;