import * as testRepository from "../repositories/testsRepository";
import * as categoriesRepository from "../repositories/categoriesRepository";
import * as teachersRepository from "../repositories/teachersRepository";
import * as disciplinesRepository from "../repositories/disciplinesRepository";
import { typeTestSchema } from "../schemas/testsSchema";
import * as teachersDisciplinesRepository from "../repositories/teachersDisciplinesRepository";
import { typeNewTest } from "../repositories/testsRepository";
import { getAllTerms } from "../repositories/termsRepository";

export async function createTest(newTest: typeTestSchema) {
  const testObj = await properTestObj(newTest);

  const createdTest = await testRepository.insertTest(testObj);
  return createdTest;
}

export async function getTestsByTerms() {
  return await testRepository.getTestsByTerms();
}

export async function getTestsByTeachers(){
  return await testRepository.getTestsByTeachers();
}

async function properTestObj(reqTest: typeTestSchema): Promise<typeNewTest> {
  const { id: categoryId } = await categoriesRepository.findCategoryOrFail(
    reqTest.category
  );
  const { id: disciplineId } = await disciplinesRepository.findDisciplineOrFail(
    reqTest.discipline
  );

  const { id: teacherId } = await teachersRepository.findTeacherOrFail(
    reqTest.teacher
  );

  const { id: teacherDisciplineId } =
    await teachersDisciplinesRepository.findTeacherDisciplineOrFail(
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
