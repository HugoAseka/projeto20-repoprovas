import { prisma } from "../config/database";

export async function findCategorieByName(name: string) {
  return await prisma.categories.findUnique({ where: { name } });
}
