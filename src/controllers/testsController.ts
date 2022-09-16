import * as testsService from "../services/testsService";
import { Request, Response } from "express";

export async function createTest(req: Request, res: Response) {
  const testData = req.body;
  const createdTest = await testsService.createTest(testData);
  res.status(201).send(createdTest);
}
