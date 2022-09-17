import generateToken from "./factories/tokenFactory";
import api from "./factories/apiFactory";

const route = "/testes/disciplinas"
describe("Tests GET /testes/disciplinas  ", () => {
    it("return status code 200 and an array when requesting with valid token", async () => {
        const token = await generateToken();
        const result  = await api.get(route).set("Authorization", `Bearer ${token}`);
        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Array)
    });

    it("return status code 401 when using invalid token", async () => {
        const result = await api.get(route).set("Authorization", `Bearer invalid_token`);
        expect(result.status).toEqual(401);
    })

})