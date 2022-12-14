import { prisma } from "../config/database";
import { users } from "@prisma/client";

export type userData = Omit<users, "id">;

export async function insertUserIntoDatabase(newUser: userData) {
  return await prisma.users.create({ data: newUser });
}

export async function findUserByEmail(email: string) {
  return await prisma.users.findUnique({ where: { email } });
}

export async function deleteUserById(id: number) {
  await prisma.users.delete({ where: { id } });
}

export async function findUserById(id:number):Promise<users>{
  return await prisma.users.findUnique({where:{id}})
}