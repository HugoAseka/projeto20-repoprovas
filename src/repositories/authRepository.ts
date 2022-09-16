import { prisma } from "../config/database";
import { users } from "@prisma/client";

export type NewUserData = Omit<users, "id">;

export async function insertUserIntoDatabase(newUser: NewUserData) {
  return await prisma.users.create({ data: newUser });
}

export async function findUserByEmail(email: string) {
  return await prisma.users.findUnique({ where: { email } });
}

export async function deleteUserById(id: number) {
  await prisma.users.delete({ where: { id } });
}
