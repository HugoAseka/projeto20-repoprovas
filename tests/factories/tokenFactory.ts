import { createUser } from "./userFactory";
import { login } from "../../src/services/authService";

export default async function generateToken(){
    const createdUser = await createUser();
    const token = await login(createdUser);
    return token;
}