import supertest from "supertest";
import app from "../src/index";
import generateToken from "./factories/tokenFactory";

const api = supertest(app);

describe("Tests GET /testes/disciplinas  ", () => {
    it("return status code 200 and an array when requesting with valid token", async () => {
        const token = await generateToken();
        const result  = await api.get("/testes/disciplinas").set("Authorization", `Bearer ${token}`);
        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Array)
    });

})