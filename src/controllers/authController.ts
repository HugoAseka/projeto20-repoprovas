import { Request, Response } from "express";
import authService from "../services/authService";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const newUser = await authService.createUser({ email, password });
  res.status(201).send(newUser);
}
