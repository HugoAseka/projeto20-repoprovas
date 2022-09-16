import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/config/database";
import { createUser, generateNewUserData, generateUserData } from "./factories/userFactory";

// export const newUser = {
//   email: "hugoaseka@gmail.com",
//   password: "0123456789",
//   passwordConfirmation: "0123456789",
// };

// export const user = {
//     email: "hugoaseka@gmail.com",
//     password: "0123456789"
//   };

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("Tests POST /cadastro", () => {
  it("returns statuscode 201 when user is created correctly", async () => {
    const newUser = await generateNewUserData();

    const result = await supertest(app).post("/cadastro").send(newUser);
    expect(result.status).toEqual(201);
  });

  it("return statuscode 409 when email is already registered", async () => {
    const newUser = await generateNewUserData();
    await supertest(app).post("/cadastro").send(newUser);
    const result = await supertest(app).post("/cadastro").send(newUser);
    expect(result.status).toEqual(409);
  });
});

describe("Tests POST /login", () => {
    it("return status 200 when login is successful", async () => {
        const createdUser = await createUser();
        
        const loginResult = await supertest(app).post("/login").send(createdUser);
        expect(loginResult.status).toEqual(200);
    })

    it("return status 401 if the password's wrong", async () => {
        const createdUser = await createUser();
        const loginResult = await supertest(app).post("/login").send({email:"hugoaseka@gmail.com", password: createdUser.password});
        expect(loginResult.status).toEqual(401);
    })

    it("return status 401 if the email's wrong", async () => { 
        const createdUser = await createUser();
        const loginResult = await supertest(app).post("/login").send({ email: createdUser.email, password:"0123456789"});
        expect(loginResult.status).toEqual(401);
    })
})