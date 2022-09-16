import { prisma } from "../config/database";
import { disciplines } from "@prisma/client";

export async function findDisciplineByName(name: string) {
  return await prisma.disciplines.findUnique({ where: { name } });
}
