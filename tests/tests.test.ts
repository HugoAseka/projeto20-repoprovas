import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/config/database";
import { validTest } from "./factories/testFactory";
import {
  generateNewUserData,
  generateUserData,
  createUser,
} from "./factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("Tests POST /testes ", () => {
  it("Returns 401 with invalid token", async () => {
    const createdUser = await createUser();
    const responseLogin = await supertest(app).post("/login").send(createdUser);
    console.log(responseLogin.body.token, "token");
    const token = responseLogin.body.token;
    const result = await supertest(app)
      .post("/testes")
      .set("Authorization", `Bearer ${token}`)
      .send(validTest);
    expect(result.status).toEqual(200);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
