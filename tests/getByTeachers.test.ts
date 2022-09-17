import api from "./factories/apiFactory";
import generateToken from "./factories/tokenFactory";

const route = "/testes/instrutores";

describe("Tests GET /testes/instrutores ", () => {
  it("receives status code 200 and array", async () => {
    const token = await generateToken();
    const result = await api.get(route).set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("return status code 401 when using invalid token", async () => {
    const result = await api
      .get(route)
      .set("Authorization", `Bearer invalid_token`);
    expect(result.status).toEqual(401);
  });
});
