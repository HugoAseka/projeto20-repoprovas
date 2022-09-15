import { NextFunction, Request, Response } from "express";
import { errorTypeToStatusCode, isAppError } from "../utils/errorUtil.js";

export default function errorsHandlerMiddleware(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("An Error Occurred!", error);

  if (isAppError(error)) {
    const statusCode = errorTypeToStatusCode(error.type);
    return res.status(statusCode).send(error.message);
  }
  res.sendStatus(500);
}
