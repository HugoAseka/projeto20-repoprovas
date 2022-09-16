import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";
import { userData } from "../../src/repositories/authRepository";
import { NewUserRequest } from "../../src/schemas/registerSchema";
import * as authService from "../../src/services/authService";

export async function createUser(): Promise<userData> {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  await authService.createUser(user);
  return user;
}

export async function generateUserData() {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  return user;
}

export async function generateNewUserData(): Promise<NewUserRequest> {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordConfirmation: "",
  };
  user.passwordConfirmation = user.password;
  return user;
}
