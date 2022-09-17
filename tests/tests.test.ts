import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/config/database";
import { invalidTest, validTest } from "./factories/testFactory";
import generateToken from "./factories/tokenFactory";

const api = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("Tests POST /testes ", () => {
  it("Returns 201 with valid token and valid test format", async () => {
    const token = await generateToken();
    await api
      .post("/testes")
      .set("Authorization", `Bearer ${token}`)
      .send(validTest)
      .expect(201);
  });

  it("Returns status code 401 when using invalid token", async () => {
    const invalidToken = "invalid_token";
    await api
      .post("/testes")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(validTest)
      .expect(401);
  });

  it("Returns status code 422 when using invalid test format", async () => {
    const token = await generateToken();
    await api
      .post("/testes")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidTest)
      .expect(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
