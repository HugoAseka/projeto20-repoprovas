import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const newUser = await authService.createUser({ email, password });
  res.status(201).send(newUser);
}

export async function login(req: Request, res: Response) {
  const user = req.body;
  const token = await authService.login(user);
  res.status(200).send({ token });
}
