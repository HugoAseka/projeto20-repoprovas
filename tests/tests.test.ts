import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/config/database";
import { invalidTest, validTest } from "./factories/testFactory";
import { createUser } from "./factories/userFactory";

const api = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("Tests POST /testes ", () => {
  it("Returns 201 with valid token and valid test format", async () => {
    const createdUser = await createUser();
    const responseLogin = await api.post("/login").send(createdUser);

    const token = responseLogin.body.token;
    console.log(token, "token");
    const result = await api
      .post("/testes")
      .set("Authorization", `Bearer ${token}`)
      .send(validTest);
    expect(result.status).toEqual(201);
  });

  it("Returns status code 401 when using invalid token", async () => {
    const invalidToken = "invalid_token";
    const result = await api
      .post("/testes")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(validTest);
    expect(result.status).toEqual(401);
  });

  it("Returns status code 422 when using invalid test format", async () => {
    const createdUser = await createUser();
    const responseLogin = await api.post("/login").send(createdUser);
    const token = responseLogin.body.token;
    const result = api
      .post("/testes")
      .set("Authorization", `Bearer ${token}`).send(invalidTest).expect(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
