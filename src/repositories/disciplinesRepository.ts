import { prisma } from "../config/database";
import { disciplines } from "@prisma/client";
import { notFoundError } from "../utils/errorUtil";

export async function findDisciplineByName(name: string) {
  return await prisma.disciplines.findUnique({ where: { name } });
}
export async function findDisciplineOrFail(name: string): Promise<disciplines> {
    const discipline = await findDisciplineByName(name);
    console.log(discipline)
    if (!discipline) throw notFoundError("Discipline doesn't exist.");
    return discipline;
  }