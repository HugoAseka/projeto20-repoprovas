import * as authRepository from "../repositories/authRepository";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtil";

dotenv.config();

async function createUser(data: authRepository.NewUserData) {
  const existingUser = await authRepository.findUserByEmail(data.email);

  if (existingUser) {
    throw conflictError();
  }

  const hashedPassword = bcrypt.hashSync(data.password, 10);
  await authRepository.insertUserIntoDatabase({
    ...data,
    password: hashedPassword,
  });
}

const authService = { createUser };

export default authService;
