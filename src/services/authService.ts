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

export async function createUser(data: authRepository.userData) {
  const existingUser = await authRepository.findUserByEmail(data.email);

  if (existingUser) {
    throw conflictError("Email already registered.");
  }

  const hashedPassword = bcrypt.hashSync(data.password, 10);
  return await authRepository.insertUserIntoDatabase({
    ...data,
    password: hashedPassword,
  });
}

export async function login(user: authRepository.userData) {
   const {id} =  await userValidation(user);
   const token = jwt.sign({userId: id}, process.env.JWT_SECRET);
   return token;
}

async function userValidation(user: authRepository.userData) {
  const registeredUser = await authRepository.findUserByEmail(user.email);
  if (!registeredUser) throw unauthorizedError("Invalid Credentials");

  const isPasswordValid = bcrypt.compareSync(
    user.password,
    registeredUser.password
  );
  if (!isPasswordValid) throw unauthorizedError("Invalid Credentials");
  return registeredUser;
}



