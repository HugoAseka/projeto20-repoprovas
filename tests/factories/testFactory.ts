import { faker } from "@faker-js/faker";



export const validTest = {
    name: faker.name.fullName(),
    pdfUrl: faker.internet.domainName(),
    category: "Projeto",
    discipline: "Humildade",
    teacher: "Bruna Hamori",
  };