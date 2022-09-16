import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/config/database";
import { validTest } from "./factories/testFactory";
import { generateNewUserData, generateUserData, createUser } from "./factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("Tests POST /tests ", () => {
  it("Returns 401 with invalid token", async () => {
    const createdUser = await createUser();
    const responseLogin = await supertest(app).post("/login").send(createdUser);
    console.log(responseLogin.body.token)
    const result = await supertest(app)
    .post("/testes")
    .send(validTest)
    .set("Authorization", `Bearer ${responseLogin.body.token}`)
    .set("Accept","application/json")
    .expect(200)

  });
});
