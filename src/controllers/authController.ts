import { Request, Response } from "express";
import authService from "../services/authService";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  await authService.createUser({ email, password });
  res.sendStatus(201);
}
