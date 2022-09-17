import { prisma } from "../config/database";
import { tests } from "@prisma/client";

export type typeNewTest = Omit<tests, "id">;

export async function insertTest(test: typeNewTest) {
  return await prisma.tests.create({ data: test });
}

export async function getAllTests() {
  return await prisma.teachersDisciplines.findMany({
    include: {
      tests: {
        include: {
          category: true,
        },
      },
      teacher: true,
      discipline: true,
    },
  });
}

export async function getTestsByTerms() {
  const result = await prisma.terms.findMany({
    select: {
      id: true,
      number: true,
      discipline: {
        select: {
          id: true,
          name: true,
          teacherDiscipline: {
            select: {
              teacher: {
                select: {
                  name: true,
                },
              },

              tests: {
                orderBy: {
                  category: {
                    name: "desc",
                  },
                },
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
}

export async function getTestsByTeachers() {
  return await prisma.teachers.findMany({
    select: {
      id: true,
      name: true,
      teacherDiscipline: {
        include: {
          tests: {
            orderBy: {
              category: {
                name: "asc",
              },
            },
            select: {
              id: true,
              name: true,
              pdfUrl: true,
              category: true,
            },
          },
        },
      },
    },
  });
}
