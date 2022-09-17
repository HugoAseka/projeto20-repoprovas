import * as testsService from "../services/testsService";
import { Request, Response } from "express";

export async function createTest(req: Request, res: Response) {
  const testData = req.body;
  const createdTest = await testsService.createTest(testData);
  res.status(201).send(createdTest);
}

export async function getTestsByTerms(req: Request, res: Response) {
  const test = await testsService.getTestsByTerms();
  res.status(200).send(test);
}
