import { prisma } from "../config/database";
import { notFoundError } from "../utils/errorUtil";
import { teachers } from "@prisma/client";

export async function findTeacherByName(name: string) {
  return await prisma.teachers.findUnique({ where: { name } });
}

export async function findTeacherOrFail(name: string): Promise<teachers> {
  const teacher = await findTeacherByName(name);
  if (!teacher) throw notFoundError("Teacher doesn't exist.");
  return teacher;
}
