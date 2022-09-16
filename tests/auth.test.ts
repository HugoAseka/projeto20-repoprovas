import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/config/database";

const newUser = {
  email: "hugoaseka@gmail.com",
  password: "0123456789",
  passwordConfirmation: "0123456789",
};

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("Tests POST /cadastro", () => {
  it("returns statuscode 201 when user is created correctly", async () => {
    const result = await supertest(app).post("/cadastro").send(newUser);
    expect(result.status).toEqual(201);
  });

  it("return statuscode 409 when email is already registered", async () => {
    await supertest(app).post("/cadastro").send(newUser);
    const result = await supertest(app).post("/cadastro").send(newUser);
    expect(result.status).toEqual(409);
  });
});
