import supertest from "supertest";
import app from "../src/index";
import { createUser } from "./factories/userFactory";

const api = supertest(app);

describe("Tests GET /testes/disciplinas  ", () => {
    it("return status code 200 and an array when requesting with valid token", async () => {
        const createdUser = await createUser();
        const responseLogin = await api.post("/login").send(createdUser);
        const token = responseLogin.body.token
    })
})