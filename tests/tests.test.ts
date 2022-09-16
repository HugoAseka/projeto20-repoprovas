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
    console.log(createdUser);
    const responseLogin = await supertest(app).post("/login").send(createdUser);
    // const result = await supertest(app)
    //   .post("/testes")
    //   .send(validTest)
    //   .set("Authorization", `Bearer ${responseLogin.body}`);
    // expect(result.status).toEqual(200);
  });
});
