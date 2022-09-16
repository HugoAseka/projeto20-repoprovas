import * as testRepository from "../repositories/testsRepository";
import * as categoriesRepository from "../repositories/categoriesRepository";
import * as teachersRepository from "../repositories/teachersRepository";
import * as disciplinesRepository from "../repositories/disciplinesRepository";
import { typeTestSchema } from "../schemas/testsSchema";
import { notFoundError } from "../utils/errorUtil";
import { typeNewTest } from "../repositories/testsRepository";
import {
  disciplines,
  categories,
  teachers,
  teachersDisciplines,
} from "@prisma/client";
import { findTeacherDisciplineByIds } from "../repositories/teachersDisciplinesRepository";

export async function createTest(newTest: typeTestSchema) {
  const testObj = await properTestObj(newTest);
  const createdTest = await testRepository.insertTest(testObj);
  return createdTest;
}
async function properTestObj(reqTest: typeTestSchema): Promise<typeNewTest> {
  const { id: categoryId } = await findCategoryOrFail(reqTest.category);
  const { id: disciplineId } = await findDisciplineOrFail(reqTest.discipline);
  const { id: teacherId } = await findTeacherOrFail(reqTest.teacher);
  const { id: teacherDisciplineId } = await findTeacherDisciplineOrFail(
    teacherId,
    disciplineId
  );
  const testObj = {
    name: reqTest.name,
    pdfUrl: reqTest.pdfUrl,
    categoryId,
    teacherDisciplineId,
  };
  return testObj;
}

async function findCategoryOrFail(name: string): Promise<categories> {
  const category = await categoriesRepository.findCategorieByName(name);
  if (!category) throw notFoundError("Category doesn't exist.");
  return category;
}
async function findDisciplineOrFail(name: string): Promise<disciplines> {
  const discipline = await disciplinesRepository.findDisciplineByName(name);
  if (!discipline) throw notFoundError("Discipline doesn't exist.");
  return discipline;
}
async function findTeacherOrFail(name: string): Promise<teachers> {
  const teacher = await teachersRepository.findTeacherByName(name);
  if (!teacher) throw notFoundError("Teacher doesn't exist.");
  return teacher;
}
async function findTeacherDisciplineOrFail(
  teacherId: number,
  disciplineId: number
): Promise<teachersDisciplines> {
  const resultArr = await findTeacherDisciplineByIds(teacherId, disciplineId);
  if (resultArr.length === 0) throw notFoundError();
  return resultArr[0];
}
