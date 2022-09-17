import supertest from "supertest";
import app from "../../src/index";

const api = supertest(app);

export default api;