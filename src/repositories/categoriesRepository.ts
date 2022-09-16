import { prisma } from "../config/database";
import { notFoundError } from "../utils/errorUtil";
import { categories } from "@prisma/client";

export async function findCategorieByName(name: string) {
  return await prisma.categories.findUnique({ where: { name } });
}

export async function findCategoryOrFail(name: string): Promise<categories> {
  const category = await findCategorieByName(name);
  if (!category) throw notFoundError("Category doesn't exist.");
  return category;
}
