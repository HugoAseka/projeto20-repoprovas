import { prisma } from "../config/database";
import { teachersDisciplines } from "@prisma/client";
import { notFoundError } from "../utils/errorUtil";

type typeNewTeacherDiscipline = Omit<teachersDisciplines, "id">;

export async function findTeacherDisciplineByIds(
  teacherId: number,
  disciplineId: number
) {
  return await prisma.teachersDisciplines.findMany({
    where: { teacherId, disciplineId },
  });
}

export async function findTeacherDisciplineOrFail(
  teacherId: number,
  disciplineId: number
): Promise<teachersDisciplines> {
  const resultArr = await findTeacherDisciplineByIds(teacherId, disciplineId);
  console.log(resultArr);
  if (resultArr.length === 0) throw notFoundError("No professor teaches this discipline");
  return resultArr[0];
}
