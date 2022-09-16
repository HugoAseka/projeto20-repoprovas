import { prisma } from "../config/database";
import { tests } from "@prisma/client";

export type typeNewTest = Omit<tests,"id">


export async function insertTest(test:typeNewTest){
    return await prisma.tests.create({data:test});
}